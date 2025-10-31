import Parser from 'rss-parser';
import OpenAI from 'openai';
import { storage } from '../storage';
import type { InsertBlogPost } from '@shared/schema';
import axios from 'axios';
import { marked } from 'marked';
import { injectInnerLinks } from './innerlink-service';

const rssParser = new Parser();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
}

export class BlogAutomationService {
  
  async fetchRSSFeeds(): Promise<void> {
    const feeds = await storage.getRssFeeds();
    
    for (const feed of feeds) {
      try {
        console.log(`Fetching RSS feed: ${feed.name}`);
        const parsedFeed = await rssParser.parseURL(feed.url);
        
        if (parsedFeed.items && parsedFeed.items.length > 0) {
          for (const item of parsedFeed.items.slice(0, 5)) {
            await this.processRSSItem(item, feed.category, feed.autoPublish ?? false);
          }
          
          await storage.updateRssFeedFetchTime(feed.id);
        }
      } catch (error) {
        console.error(`Error fetching feed ${feed.name}:`, error);
      }
    }
  }

  private async processRSSItem(
    item: RSSItem, 
    category: 'Sparen' | 'Lenen' | 'Beleggen' | 'Planning',
    autoPublish: boolean
  ): Promise<void> {
    if (!item.title || !item.link || !item.guid) return;

    const existingPost = await storage.getBlogPost(this.createSlug(item.title));
    if (existingPost) {
      console.log(`Blog post already exists: ${item.title}`);
      return;
    }

    console.log(`Generating blog post for: ${item.title}`);
    const blogPost = await this.generateBlogPost(item, category, autoPublish);
    
    if (blogPost) {
      await storage.createBlogPost(blogPost);
      const statusMsg = autoPublish ? 'published (autopilot)' : 'draft';
      console.log(`Created blog post as ${statusMsg}: ${blogPost.title}`);
    }
  }

  private async generateBlogPost(
    item: RSSItem,
    category: 'Sparen' | 'Lenen' | 'Beleggen' | 'Planning',
    autoPublish: boolean
  ): Promise<InsertBlogPost | null> {
    try {
      const sourceContent = item.content || item.contentSnippet || '';
      
      const prompt = `Je bent een Belgische financiële expert die blog posts schrijft voor Interesten.be, een Belgische website over sparen, lenen, beleggen en financiële planning.

BRON ARTIKEL:
Titel: ${item.title}
Content: ${sourceContent.substring(0, 2000)}

INSTRUCTIES:
1. Schrijf een VOLLEDIG NIEUWE blog post in het Nederlands voor de Belgische markt
2. Categorie: ${category}
3. De blog moet informatief en praktisch zijn voor Belgische lezers
4. Gebruik Belgische financiële termen en voorbeelden (EUR, roerende voorheffing, etc.)
5. Maak de post SEO-vriendelijk met goede koppen (##) en structuur
6. Schrijf minimaal 1000 woorden
7. Gebruik markdown formatting met ## voor koppen
8. Voeg praktische tips en concrete cijfers toe
9. Link naar relevante calculators op interesten.be waar mogelijk
10. Schrijf alsof je een expert bent die de lezer wil helpen

Genereer ALLEEN de content in markdown formaat. Geen extra tekst.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Je bent een Belgische financiële expert die professionele blog posts schrijft in het Nederlands.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      let content = completion.choices[0].message.content;
      if (!content) return null;

      // Clean up markdown wrappers that OpenAI might add
      content = this.stripMarkdownWrappers(content);

      const title = await this.generateTitle(item.title!, category);
      
      // Add inline images to content
      content = await this.insertInlineImages(content, category);
      
      // Convert markdown to HTML for innerlink injection
      const htmlContent = marked(content) as string;
      
      // Inject innerlinks
      const { modifiedHtml, linkedCalculators, linkCount } = await injectInnerLinks(htmlContent);
      
      // Log which calculators were linked
      console.log(`[Blog Automation] Injected ${linkCount} innerlinks:`, linkedCalculators);
      
      // Store as HTML (blog-detail will be updated to handle both markdown and HTML)
      content = modifiedHtml;
      
      const excerpt = await this.generateExcerpt(content);
      const seoData = await this.generateSEOData(title, content);

      const slug = this.createSlug(title);
      const readTime = this.calculateReadTime(content);
      
      // Fetch featured image
      const featuredImage = await this.getCategoryImage(category);

      const blogPost: InsertBlogPost = {
        slug,
        title,
        excerpt,
        content,
        category,
        authorName: 'Sophie Janssens',
        authorBio: 'Financieel expert met 15 jaar ervaring in persoonlijke financiën en vermogensbeheer in België',
        authorAvatar: 'https://ui-avatars.com/api/?name=Sophie+Janssens&background=2563eb&color=fff&size=200',
        publishDate: new Date(),
        readTime,
        image: featuredImage,
        seoTitle: seoData.title,
        seoDescription: seoData.description,
        seoKeywords: seoData.keywords,
        status: autoPublish ? 'published' : 'draft',
        sourceUrl: item.link,
        rssItemId: item.guid,
      };

      return blogPost;
    } catch (error) {
      console.error('Error generating blog post:', error);
      return null;
    }
  }

  private stripMarkdownWrappers(text: string): string {
    // Trim first to normalize whitespace
    text = text.trim();
    
    // Remove markdown code fences with any surrounding whitespace
    text = text.replace(/^\s*```(?:markdown)?\s*/i, '').replace(/\s*```\s*$/i, '');
    
    // Remove surrounding quotes (single, double, or triple) with any surrounding whitespace
    // Use global flag to handle multiple quote layers
    text = text.replace(/^\s*["']{1,3}/g, '').replace(/["']{1,3}\s*$/g, '');
    
    // Final trim to clean up any remaining whitespace
    return text.trim();
  }

  private async generateTitle(originalTitle: string, category: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Geef een SEO-vriendelijke Nederlandstalige titel voor een ${category} blog post gebaseerd op: "${originalTitle}". Max 60 karakters. Alleen de titel, geen extra tekst.`
          }
        ],
        temperature: 0.7,
        max_tokens: 50,
      });

      const title = completion.choices[0].message.content?.trim() || originalTitle;
      return this.stripMarkdownWrappers(title);
    } catch (error) {
      return originalTitle;
    }
  }

  private async generateExcerpt(content: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Schrijf een boeiende excerpt (samenvatting) van 120-150 karakters in het Nederlands voor deze blog content:\n\n${content.substring(0, 1000)}\n\nAlleen de excerpt, geen extra tekst.`
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return completion.choices[0].message.content?.trim() || content.substring(0, 150) + '...';
    } catch (error) {
      return content.substring(0, 150) + '...';
    }
  }

  private async generateSEOData(title: string, content: string): Promise<{
    title: string;
    description: string;
    keywords: string[];
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Genereer SEO data voor deze blog post:
Titel: ${title}
Content: ${content.substring(0, 500)}

Geef terug als JSON met deze structuur:
{
  "title": "SEO titel (max 60 chars)",
  "description": "Meta beschrijving (max 160 chars)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Alleen JSON, geen extra tekst.`
          }
        ],
        temperature: 0.5,
        max_tokens: 200,
      });

      const response = completion.choices[0].message.content;
      if (response) {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const seoData = JSON.parse(jsonMatch[0]);
          return {
            title: seoData.title || title,
            description: seoData.description || '',
            keywords: seoData.keywords || []
          };
        }
      }
    } catch (error) {
      console.error('Error generating SEO data:', error);
    }

    return {
      title: title.substring(0, 60),
      description: content.substring(0, 160).replace(/[#*]/g, ''),
      keywords: []
    };
  }

  private createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[áàâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  private async fetchStockImage(query: string): Promise<string | null> {
    // Skip if no API key configured
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      console.log('No Pexels API key configured, using fallback images');
      return null;
    }

    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query,
          per_page: 1,
          orientation: 'landscape'
        },
        headers: {
          Authorization: apiKey
        }
      });

      if (response.data.photos && response.data.photos.length > 0) {
        return response.data.photos[0].src.large2x;
      }
      return null;
    } catch (error) {
      console.error('Error fetching stock image:', error);
      return null;
    }
  }

  private async getCategoryImage(category: string): Promise<string> {
    const queries: Record<string, string> = {
      'Sparen': 'savings money piggybank',
      'Lenen': 'loan mortgage house keys',
      'Beleggen': 'investment stocks finance',
      'Planning': 'financial planning calculator'
    };
    
    const query = queries[category] || 'finance money';
    const imageUrl = await this.fetchStockImage(query);
    
    if (imageUrl) return imageUrl;
    
    // Fallback to static images
    const images: Record<string, string> = {
      'Sparen': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop',
      'Lenen': 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=675&fit=crop',
      'Beleggen': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop',
      'Planning': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop'
    };
    return images[category] || images['Sparen'];
  }

  private async insertInlineImages(content: string, category: string): Promise<string> {
    // Split content into lines and find good insertion points
    const lines = content.split('\n');
    if (lines.length < 20) return content; // Too short for inline images

    const imageQueries: Record<string, string[]> = {
      'Sparen': ['piggy bank savings', 'interest rate chart'],
      'Lenen': ['mortgage contract', 'loan calculator'],
      'Beleggen': ['stock market graph', 'investment portfolio'],
      'Planning': ['budget planning', 'retirement savings']
    };

    const fallbackImages: Record<string, string[]> = {
      'Sparen': [
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop'
      ],
      'Lenen': [
        'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=675&fit=crop',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=675&fit=crop'
      ],
      'Beleggen': [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=675&fit=crop',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop'
      ],
      'Planning': [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop'
      ]
    };

    const queries = imageQueries[category] || ['finance', 'money'];
    const fallbacks = fallbackImages[category] || fallbackImages['Sparen'];
    
    // Insert at 1/3 and 2/3 of content, after empty lines (paragraph breaks)
    const insertPositions = [Math.floor(lines.length / 3), Math.floor(2 * lines.length / 3)];
    
    // Work backwards to avoid index shifting
    for (let i = insertPositions.length - 1; i >= 0; i--) {
      let position = insertPositions[i];
      
      // Find next empty line after position for clean insertion
      while (position < lines.length && lines[position].trim() !== '') {
        position++;
      }
      
      if (position < lines.length && queries[i]) {
        let imageUrl = await this.fetchStockImage(queries[i]);
        
        if (!imageUrl) {
          imageUrl = fallbacks[i] || fallbacks[0];
        }
        
        const altText = queries[i];
        // Insert image markdown after empty line
        lines.splice(position + 1, 0, '', `![${altText}](${imageUrl})`, '');
      }
    }

    return lines.join('\n');
  }

  async publishPendingPosts(): Promise<void> {
    const draftPosts = await storage.getBlogPosts('draft');
    
    for (const post of draftPosts) {
      await storage.publishBlogPost(post.id);
      console.log(`Published blog post: ${post.title}`);
    }
  }

  async generateImagesForPost(postId: string): Promise<any> {
    try {
      const post = await storage.getBlogPostById(postId);
      if (!post) return null;

      // Generate featured image
      const featuredImage = await this.getCategoryImage(post.category);
      
      // Clean up existing content wrappers before inserting images
      let cleanedContent = this.stripMarkdownWrappers(post.content);
      
      // Add inline images to content
      const contentWithImages = await this.insertInlineImages(cleanedContent, post.category);

      // Update the post
      const updatedPost = await storage.updateBlogPost(postId, {
        image: featuredImage,
        content: contentWithImages
      });

      console.log(`Generated images for blog post: ${post.title}`);
      return updatedPost;
    } catch (error) {
      console.error('Error generating images for post:', error);
      throw error;
    }
  }
}

export const blogAutomationService = new BlogAutomationService();
