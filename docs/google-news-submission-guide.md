# Google News Publisher Center Submission Guide

**For: Interesten.be**  
**Last Updated: October 31, 2025**  
**Author: Technical Documentation**

---

## Table of Contents

1. [Prerequisites Checklist](#1-prerequisites-checklist)
2. [Google News Content Policies](#2-google-news-content-policies)
3. [Publisher Center Registration Steps](#3-publisher-center-registration-steps)
4. [Site Verification Methods](#4-site-verification-methods)
5. [Content Section Setup](#5-content-section-setup)
6. [Quality Guidelines](#6-quality-guidelines)
7. [After Submission](#7-after-submission)
8. [Monitoring & Optimization](#8-monitoring--optimization)
9. [Troubleshooting Common Issues](#9-troubleshooting-common-issues)
10. [Technical Implementation Checklist](#10-technical-implementation-checklist)

---

## 1. Prerequisites Checklist

Before submitting to Google News Publisher Center, verify that your site meets all technical and content requirements:

### Technical Requirements

- ✅ **NewsArticle Schema.org Structured Data** - All blog posts include NewsArticle schema markup (implemented in `client/src/components/seo/NewsArticleSchema.tsx`)
- ✅ **Google News XML Sitemap** - Available at `https://interesten.be/news-sitemap.xml` (implemented in `server/routes.ts`)
- ✅ **HTTPS Protocol** - Site uses secure HTTPS connection
- ✅ **Mobile-Friendly Design** - Responsive design works across all device sizes
- ✅ **Fast Load Times** - Pages load quickly (< 3 seconds)
- ✅ **Clean URL Structure** - SEO-friendly, readable URLs

### Content Requirements

- ✅ **Regular Publishing Frequency** - Aim for 3-5 high-quality articles per day
- ✅ **Original Content** - All articles are unique and not duplicated from other sources
- ✅ **Quality Scoring System** - Automated quality checks ensure only high-quality content (score >7) is published
- ✅ **Author Attribution** - Clear author information (Sophie Janssens) on all articles
- ✅ **Publication Dates** - ISO 8601 format timestamps on all articles
- ✅ **Privacy Policy** - Accessible at `https://interesten.be/privacy`
- ✅ **Terms of Service** - Accessible at `https://interesten.be/voorwaarden`

### Content Quality Indicators

- Original financial analysis and reporting
- Relevant to Belgian audience
- Professional editorial standards
- Fact-based journalism
- No clickbait or misleading headlines
- Proper source attribution

---

## 2. Google News Content Policies

Google News has strict content policies. Your publication must adhere to these standards:

### Core Principles

**1. Original Reporting and Analysis**
- Content must provide unique insights, analysis, or reporting
- Aggregated content from RSS feeds should be enhanced with original commentary
- Add value beyond what's available in source material

**2. Transparency in Authorship**
- Clearly display author names (e.g., Sophie Janssens)
- Include author bio and credentials where relevant
- Contact information should be available

**3. Clear Datelines and Timestamps**
- Every article must have a clear publication date
- Use ISO 8601 format: `2025-10-31T10:30:00+01:00`
- Update timestamps when content is significantly revised

**4. No Misleading Content**
- Headlines must accurately reflect article content
- Avoid sensationalized or clickbait titles
- No false or misleading information

**5. Professional Editorial Standards**
- Maintain high journalistic standards
- Fact-check all claims and statistics
- Correct errors promptly and transparently

**6. Fact-Based Journalism**
- Base articles on verifiable facts
- Distinguish between news reporting and opinion/analysis
- Cite credible sources for financial data

### Prohibited Content

- Dangerous or illegal content
- Hate speech or harassment
- Misleading financial advice
- Plagiarized content
- Spam or manipulative content
- Adult content (not relevant for financial site)

**⚠️ Warning:** Violations of these policies can result in removal from Google News or permanent ban.

**📖 Official Policy:** https://support.google.com/news/publisher-center/answer/9607025

---

## 3. Publisher Center Registration Steps

Follow these detailed steps to register your publication with Google News:

### Step 1: Access Publisher Center

1. Navigate to **https://publishercenter.google.com**
2. Sign in with your Google account (use a business account associated with interesten.be)
3. If you don't have an account, create one using your business email

**💡 Tip:** Use a dedicated Google account for business purposes to keep personal and professional accounts separate.

### Step 2: Add Your Publication

1. Click the **"Add Publication"** button (usually in the top-right corner)
2. You'll see a form to enter publication details

### Step 3: Enter Publication Details

Fill in the following information carefully:

**Publication Name:**
```
Interesten.be
```

**Publication URL:**
```
https://interesten.be
```

**Primary Language:**
- Select **Dutch (nl)** as the primary language
- If you publish bilingual content, add **French (fr)** as a secondary language

**Country/Region:**
```
Belgium
```

**Publication Description:**
Write a clear, concise description (150-300 characters):
```
Interesten.be is Belgium's leading financial information platform, providing expert analysis on savings accounts, loans, investments, and financial planning for Belgian consumers.
```

**Content Focus:**
- Select relevant categories: Finance, Business, Economy
- Primary topic: Personal Finance

**Publication Frequency:**
```
Daily (3-5 articles per day)
```

### Step 4: Verify Site Ownership

Before you can submit your publication, you must verify that you own the domain. Choose one of the verification methods described in [Section 4](#4-site-verification-methods).

### Step 5: Submit for Review

1. Review all entered information for accuracy
2. Click **"Submit for Review"**
3. You'll receive a confirmation email

**⏱️ Expected Timeline:** Google typically reviews submissions within 2-4 weeks, but it can take longer.

---

## 4. Site Verification Methods

You must verify ownership of interesten.be. Google offers several methods:

### Method 1: Google Search Console (Recommended)

**Best if:** You already have your site verified in Google Search Console.

**Steps:**
1. In Publisher Center, select "Google Search Console" as verification method
2. Choose the verified property `https://interesten.be` from the dropdown
3. Click "Verify"

**✅ Advantage:** Instant verification if already set up in Search Console.

**📖 Search Console Setup:** https://search.google.com/search-console

---

### Method 2: HTML File Upload

**Best if:** You have direct access to your site's root directory.

**Steps:**
1. In Publisher Center, select "HTML file upload"
2. Download the verification file (e.g., `google1234567890abcdef.html`)
3. Upload this file to your site's root directory: `client/public/`
4. Ensure the file is accessible at `https://interesten.be/google1234567890abcdef.html`
5. Return to Publisher Center and click "Verify"

**⚠️ Important:** 
- Do not modify the verification file content
- Keep the file on your server permanently
- The file must be publicly accessible (not blocked by robots.txt)

**Example Implementation:**
```bash
# Upload verification file to client/public/
# File will be automatically served at root level
cp google1234567890abcdef.html client/public/
```

---

### Method 3: HTML Meta Tag

**Best if:** You can edit the HTML `<head>` section of your homepage.

**Steps:**
1. In Publisher Center, select "HTML meta tag"
2. Copy the provided meta tag (looks like this):
```html
<meta name="google-site-verification" content="your-verification-code-here" />
```
3. Add this tag to the `<head>` section of `client/index.html`
4. Deploy the changes
5. Return to Publisher Center and click "Verify"

**Implementation Example:**

Edit `client/index.html`:
```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="google-site-verification" content="your-verification-code-here" />
    <!-- Rest of head content -->
  </head>
  <body>
    <!-- Body content -->
  </body>
</html>
```

**⚠️ Important:** Keep this tag in your HTML permanently. Removing it may cause verification to fail.

---

### Method 4: Google Analytics

**Best if:** You already have Google Analytics installed on your site.

**Steps:**
1. In Publisher Center, select "Google Analytics"
2. Ensure you're using the same Google account that has admin access to your Analytics property
3. Select the Analytics property for interesten.be
4. Click "Verify"

**✅ Advantage:** No additional code changes needed if Analytics is already installed.

---

### Verification Troubleshooting

**Problem:** Verification fails  
**Solutions:**
- Wait a few hours and try again (DNS propagation can take time)
- Check that the verification file/tag is publicly accessible
- Clear your browser cache and try again
- Ensure robots.txt doesn't block the verification file

**Problem:** Verification file returns 404  
**Solution:** Ensure the file is in the correct directory and the server is configured to serve static files from `client/public/`

---

## 5. Content Section Setup

After your publication is verified, configure your content sections:

### Step 1: Add News Sitemap

1. In Publisher Center, navigate to "Content" → "Sitemaps"
2. Click "Add Sitemap"
3. Enter your news sitemap URL:
```
https://interesten.be/news-sitemap.xml
```
4. Click "Submit"

**✅ Verification:** Google will crawl the sitemap and display the number of articles found. This may take 24-48 hours.

**News Sitemap Features:**
- Updates automatically as new blog posts are published
- Includes only posts from the last 7 days
- Contains all required NewsArticle metadata
- Implemented in `server/routes.ts`

---

### Step 2: Configure Content Sections

Organize your content into logical sections matching your site structure:

**Recommended Sections for Interesten.be:**

1. **Sparen (Savings)**
   - Label: `Sparen`
   - URL Pattern: `https://interesten.be/blog?category=sparen`
   - Description: Articles about savings accounts, interest rates, and savings strategies

2. **Lenen (Loans)**
   - Label: `Lenen`
   - URL Pattern: `https://interesten.be/blog?category=lenen`
   - Description: Content about mortgages, personal loans, and credit

3. **Beleggen (Investing)**
   - Label: `Beleggen`
   - URL Pattern: `https://interesten.be/blog?category=beleggen`
   - Description: Investment analysis, portfolio strategies, and market insights

4. **Planning (Financial Planning)**
   - Label: `Planning`
   - URL Pattern: `https://interesten.be/blog?category=planning`
   - Description: Budget planning, retirement planning, and financial goals

5. **Nieuws (General Financial News)**
   - Label: `Nieuws`
   - URL Pattern: `https://interesten.be/nieuws`
   - Description: Latest Belgian financial news and updates

**How to Add Sections:**
1. Go to "Publication" → "Sections"
2. Click "Add Section"
3. Enter section name, URL pattern, and description
4. Save

---

### Step 3: Set Publication Schedule

**Recommended Schedule for Interesten.be:**
- **Publishing Frequency:** Daily
- **Target:** 3-5 articles per day
- **Best Publishing Times:** 
  - Morning: 7:00-9:00 AM (commute time)
  - Lunch: 12:00-1:00 PM
  - Evening: 6:00-8:00 PM

**💡 Tip:** Consistent publishing schedule helps Google understand your content rhythm and may improve indexing speed.

---

### Step 4: Define Article Categories

Use Google News categories to help with content classification:

**Primary Categories for Financial Content:**
- Business
- Economy
- Finance
- Technology (for fintech articles)
- Personal Finance

**How to Set Categories:**
- Categories are automatically detected from your NewsArticle schema
- Ensure your schema includes the `articleSection` property
- Reference: `client/src/components/seo/NewsArticleSchema.tsx`

---

## 6. Quality Guidelines

Google News favors high-quality publications. Follow these best practices:

### Content Quality Standards

**1. Publish High-Quality Articles (3-5 daily)**
- **Minimum Word Count:** 300-500 words per article
- **Depth:** Provide analysis, not just summaries
- **Originality:** Add unique insights to aggregated content
- **Relevance:** Focus on Belgian financial topics

**2. Use Quality Scoring System**
Your site already implements an automated quality scoring system:
- Articles must score >7 out of 10 to be auto-published
- Scoring criteria include:
  - Content length and depth
  - Readability and structure
  - SEO optimization
  - Factual accuracy indicators
- Reference: `server/services/blog-automation.ts`

**3. Maintain Editorial Consistency**
- Use consistent writing style and tone
- Follow AP Style or similar editorial guidelines
- Professional formatting and structure
- Proper grammar and spelling

**4. Proper Attribution and Sources**
- Credit all sources and quotes
- Link to original sources when referencing data
- Clearly distinguish between reporting and analysis
- Author byline on every article (Sophie Janssens)

**5. Regular Content Updates**
- Update older articles with new information when relevant
- Mark updated articles with "Last Updated" timestamp
- Keep evergreen content fresh and accurate

---

### Belgian Financial Focus

**Relevant Topics for Your Audience:**
- Belgian interest rates and central bank policies
- Local savings account comparisons
- Belgian tax implications for investments
- Mortgage rate trends in Belgium
- Belgian financial regulations (FSMA)
- Euro zone economic impacts on Belgian consumers
- Belgian pension system updates
- Local fintech developments

**💡 Tip:** Articles with local relevance perform better in Google News Belgium.

---

### Editorial Best Practices

**Headlines:**
- Clear and descriptive (not clickbait)
- 50-70 characters for optimal display
- Include key terms naturally
- Accurate reflection of content

**Article Structure:**
- Strong opening paragraph (who, what, when, where, why)
- Logical flow with clear subheadings
- Data and statistics to support claims
- Actionable takeaways or conclusions

**Images:**
- High-quality, relevant images
- Proper alt text for accessibility
- Image credits where required
- Optimize for fast loading

---

## 7. After Submission

### What to Expect

**Review Timeline:**
- **Typical Duration:** 2-4 weeks
- **Can Take Longer:** Up to 6-8 weeks during peak periods
- **No Notification:** Google doesn't send updates during review

**How to Check Status:**
1. Log into Publisher Center
2. Navigate to your publication
3. Check the status indicator:
   - 🟡 **Pending:** Under review
   - 🟢 **Approved:** Ready to publish to Google News
   - 🔴 **Needs Work:** Issues to address
   - ⚫ **Rejected:** Not accepted (rare)

---

### Possible Outcomes

#### ✅ Approved

**Congratulations!** Your publication is now eligible for Google News.

**Next Steps:**
1. Ensure your news sitemap is actively being crawled
2. Monitor Google Search Console for any indexing issues
3. Check Google News regularly to see your articles appearing
4. Track traffic from Google News in Analytics
5. Continue publishing high-quality content consistently

**⏱️ Timeline:** Articles typically appear in Google News within 24-48 hours of publication.

---

#### ⚠️ Needs Work

Google has identified issues that need to be addressed before approval.

**Common Issues:**
- Insufficient content volume (not enough published articles)
- Content quality concerns (thin content, duplicate content)
- Technical issues (sitemap errors, schema markup problems)
- Policy violations (misleading content, inadequate attribution)

**What to Do:**
1. Read Google's feedback carefully in Publisher Center
2. Address each issue systematically
3. Make necessary improvements to your site
4. Wait for improvements to be indexed (allow 1-2 weeks)
5. Resubmit your publication

**💡 Tip:** Build up your content library before resubmitting. Aim for 20-30 high-quality articles minimum.

---

#### ❌ Rejected

In rare cases, Google may reject a publication entirely.

**Common Reasons:**
- Severe policy violations
- Site doesn't meet quality standards
- Duplicate or primarily aggregated content without original analysis
- Technical barriers preventing proper indexing

**What to Do:**
1. Review Google's rejection reason
2. Make substantial improvements to site quality and content
3. Consider waiting 3-6 months to build a stronger content library
4. Resubmit only when you've made significant changes

**⚠️ Important:** Repeated rejected submissions may result in longer review times or permanent rejection.

---

### Resubmission Process

If you need to resubmit after addressing issues:

1. Make all required improvements
2. Wait 1-2 weeks for Google to recrawl your site
3. In Publisher Center, click "Request Review" or "Resubmit"
4. Provide a brief explanation of changes made
5. Submit and wait for review (2-4 weeks again)

**💡 Tip:** Document all changes you make so you can reference them in your resubmission.

---

## 8. Monitoring & Optimization

Once approved, actively monitor your Google News performance:

### Google Search Console Monitoring

**Access News Performance Report:**
1. Go to https://search.google.com/search-console
2. Select your property (interesten.be)
3. Navigate to "Performance" → "Search Results"
4. Add filter: "News" appearance

**Key Metrics to Track:**
- **Impressions:** How many times your articles appear in Google News
- **Clicks:** How many users click through to your site
- **CTR (Click-Through Rate):** Percentage of impressions that result in clicks
- **Average Position:** Where your articles rank in Google News

**🎯 Goal:** Aim for CTR >2% (higher is better)

---

### Check Indexing Status

**Monitor Article Indexing:**
1. In Search Console, go to "Coverage" or "Pages"
2. Check for any errors or warnings
3. Use URL Inspection Tool to check specific articles
4. Look for "Discovered - Currently not indexed" (investigate why)

**Verify News Sitemap:**
1. Go to "Sitemaps" in Search Console
2. Check status of `/news-sitemap.xml`
3. Ensure it's being crawled regularly
4. Look for any sitemap errors

**⚠️ Alert:** If articles aren't being indexed, check:
- robots.txt isn't blocking Googlebot-News
- NewsArticle schema is present and valid
- Articles are included in news sitemap
- Server response time is acceptable

---

### Analyze Traffic from Google News

**In Google Analytics:**
1. Navigate to "Acquisition" → "All Traffic" → "Source/Medium"
2. Look for traffic from `news.google.com` or `google / news`
3. Analyze which articles drive the most traffic
4. Check engagement metrics (time on page, bounce rate)

**Key Performance Indicators:**
- **Traffic Volume:** Total visits from Google News
- **Engagement:** Average session duration >1 minute
- **Bounce Rate:** Aim for <70%
- **Pages per Session:** >1.5 indicates good content discovery

---

### Content Performance Analysis

**Identify Top Performing Content:**
1. Which topics drive the most traffic from Google News?
2. What headlines have the highest CTR?
3. Which article categories perform best?
4. What publishing times generate most engagement?

**Optimization Actions:**
- Publish more content on high-performing topics
- Replicate successful headline formulas
- Adjust publishing schedule based on peak traffic times
- Improve underperforming content categories

**💡 Tip:** Create a monthly performance report to track trends over time.

---

### SEO and Schema Optimization

**Regularly Audit:**
1. **NewsArticle Schema:** Use Google's Rich Results Test
   - https://search.google.com/test/rich-results
   - Test a sample of recent articles
   - Fix any schema errors promptly

2. **Mobile Usability:** Ensure articles are mobile-friendly
   - Test in Google's Mobile-Friendly Test
   - Check load times on mobile devices

3. **Core Web Vitals:** Monitor page experience metrics
   - LCP (Largest Contentful Paint): <2.5 seconds
   - FID (First Input Delay): <100 milliseconds
   - CLS (Cumulative Layout Shift): <0.1

---

### Continuous Improvement

**Monthly Tasks:**
- Review top 10 performing articles
- Update outdated content with fresh information
- Optimize underperforming articles (better headlines, images, structure)
- Check for broken links or outdated data

**Quarterly Tasks:**
- Comprehensive content audit
- Competitor analysis (what's working for similar Belgian financial sites?)
- Update content strategy based on performance data
- Review and refresh author bio and credentials

**Annual Tasks:**
- Major site technical audit
- Refresh brand voice and editorial guidelines
- Evaluate and update content categories
- Consider expanding into new content areas

---

## 9. Troubleshooting Common Issues

### Issue: News Sitemap Not Being Crawled

**Symptoms:**
- Sitemap shows as "pending" in Search Console
- Articles not appearing in Google News
- Low crawl rate in sitemap report

**Solutions:**

1. **Verify robots.txt allows Googlebot-News:**
   - Check `client/public/robots.txt`
   - Ensure it includes:
   ```
   User-agent: Googlebot-News
   Allow: /

   Sitemap: https://interesten.be/news-sitemap.xml
   ```

2. **Resubmit sitemap in Search Console:**
   - Go to "Sitemaps" section
   - Remove old sitemap if present
   - Add sitemap URL again
   - Click "Submit"

3. **Check sitemap accessibility:**
   - Visit https://interesten.be/news-sitemap.xml directly
   - Ensure it returns valid XML (not 404 or 500 error)
   - Verify it contains recent articles (last 7 days)

4. **Ping Google directly:**
   ```
   http://www.google.com/ping?sitemap=https://interesten.be/news-sitemap.xml
   ```

**⏱️ Note:** Sitemap crawling can take 24-48 hours. Be patient.

---

### Issue: Articles Not Appearing in Google News

**Symptoms:**
- Sitemap is being crawled
- Articles are indexed in regular Google search
- But not showing up in Google News

**Solutions:**

1. **Verify NewsArticle Schema:**
   - Use Rich Results Test: https://search.google.com/test/rich-results
   - Test several recent articles
   - Fix any schema errors or warnings
   - Ensure all required properties are present:
     - headline
     - datePublished
     - dateModified
     - author (with name)
     - image (at least 1200px wide)

2. **Check Article Eligibility:**
   - Article must be less than 7 days old (for news sitemap)
   - Content must be substantial (300+ words recommended)
   - Must follow Google News content policies
   - Must be accessible (not behind paywall without structured data markup)

3. **Verify Article Quality:**
   - Ensure articles meet editorial standards
   - Check that quality score is >7
   - Confirm articles provide original analysis, not just aggregation

4. **Check Google News Inclusion:**
   - Search for your article directly in Google News: `site:interesten.be [article topic]`
   - If it doesn't appear, check for policy violations

**💡 Tip:** It can take 24-48 hours for new articles to appear in Google News after publication.

---

### Issue: Low Approval Chances

**Symptoms:**
- Submission stuck in "pending" for weeks
- Previous submission rejected or needs work
- Low content volume or quality

**Solutions:**

1. **Increase Content Volume:**
   - Publish consistently (3-5 articles daily) for at least 2-3 weeks before submitting
   - Build a library of 30-50 high-quality articles
   - Demonstrate regular publishing cadence

2. **Improve Content Quality:**
   - Use quality scoring system to ensure all articles score >7
   - Add more depth and original analysis
   - Increase article length (aim for 500-800 words)
   - Include data, statistics, and expert insights

3. **Enhance Editorial Standards:**
   - Professional copyediting for all articles
   - Consistent formatting and structure
   - Proper attribution and citations
   - Clear author bio with credentials

4. **Strengthen Belgian Focus:**
   - Ensure content is highly relevant to Belgian audience
   - Include local financial data and regulations
   - Reference Belgian institutions (NBB, FSMA, etc.)
   - Cover Belgian-specific financial events and trends

5. **Technical Excellence:**
   - Fix all schema markup errors
   - Ensure site loads quickly (<3 seconds)
   - Perfect mobile responsiveness
   - Clean, professional design

**⏱️ Timeline:** After improvements, wait 2-3 weeks before resubmitting to allow Google to recrawl.

---

### Issue: Verification Problems

**Symptoms:**
- Cannot verify site ownership
- Verification keeps failing
- Error messages in Publisher Center

**Solutions:**

1. **Try Alternative Verification Method:**
   - If HTML file isn't working, try meta tag
   - If meta tag isn't working, try Google Search Console
   - If Search Console isn't working, try Google Analytics

2. **Check DNS and Hosting:**
   - Ensure domain is properly configured
   - Verify DNS propagation (use tools like whatsmydns.net)
   - Check that site is accessible from different locations
   - Ensure no CDN or firewall is blocking Google's verification

3. **Clear Caches:**
   - Clear your browser cache
   - If using a CDN (Cloudflare, etc.), purge cache
   - Wait a few hours and try again

4. **Verify File Accessibility:**
   - For HTML file method:
     - Manually visit the verification file URL
     - Ensure it returns the file content (not 404)
     - Check server logs for any access errors
   - For meta tag method:
     - View page source and confirm tag is present
     - Ensure tag is in `<head>` section, not `<body>`

5. **Contact Support:**
   - If all else fails, use Publisher Center support
   - Provide detailed error messages
   - Include screenshots of verification attempts

---

### Issue: Sudden Drop in Google News Traffic

**Symptoms:**
- Traffic from Google News decreased significantly
- Articles stopped appearing in news results
- Impressions dropped in Search Console

**Potential Causes and Solutions:**

1. **Content Quality Decline:**
   - Review recent articles for quality
   - Ensure quality scoring system is working
   - Check for any policy violations

2. **Technical Issues:**
   - Verify news sitemap is still being crawled
   - Check for schema markup errors
   - Ensure site is accessible and fast

3. **Algorithm Update:**
   - Google News algorithm changes periodically
   - Focus on improving content quality and user engagement
   - Diversify traffic sources (don't rely only on Google News)

4. **Competitor Content:**
   - Analyze competitor content that's ranking well
   - Identify gaps in your coverage
   - Improve headline and image optimization

5. **Seasonal Trends:**
   - Financial news has seasonal patterns
   - Some topics are more popular at certain times
   - Adjust content strategy based on seasonal demand

---

## 10. Technical Implementation Checklist

Verify all technical requirements are properly implemented on your site:

### ✅ NewsArticle Schema Implementation

**Location:** `client/src/components/seo/NewsArticleSchema.tsx`

**Required Properties:**
- ✅ `@type`: "NewsArticle"
- ✅ `headline`: Article title
- ✅ `datePublished`: ISO 8601 format
- ✅ `dateModified`: ISO 8601 format
- ✅ `author`: Author information (Sophie Janssens)
- ✅ `publisher`: Organization information
- ✅ `image`: High-quality images (min 1200px width)
- ✅ `articleSection`: Content category
- ✅ `description`: Article summary/excerpt

**Validation:**
- Test URLs in Google Rich Results Test
- Check structured data in Search Console
- Ensure no errors or warnings

**Example Schema Output:**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Belgian Savings Rates Reach 3-Year High",
  "datePublished": "2025-10-31T10:00:00+01:00",
  "dateModified": "2025-10-31T10:00:00+01:00",
  "author": {
    "@type": "Person",
    "name": "Sophie Janssens"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Interesten.be",
    "logo": {
      "@type": "ImageObject",
      "url": "https://interesten.be/logo.png"
    }
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://interesten.be/images/article-image.jpg",
    "width": 1200,
    "height": 675
  },
  "articleSection": "Sparen",
  "description": "Analysis of the latest savings account interest rates in Belgium..."
}
```

---

### ✅ News Sitemap Configuration

**Location:** `server/routes.ts` - `/news-sitemap.xml` endpoint

**Requirements:**
- ✅ Only includes articles from last 7 days
- ✅ Updates automatically when new blog posts are published
- ✅ Includes publication date and title for each article
- ✅ Follows Google News sitemap specification
- ✅ Accessible at: `https://interesten.be/news-sitemap.xml`

**Sitemap Format:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://interesten.be/blog/article-slug</loc>
    <news:news>
      <news:publication>
        <news:name>Interesten.be</news:name>
        <news:language>nl</news:language>
      </news:publication>
      <news:publication_date>2025-10-31T10:00:00+01:00</news:publication_date>
      <news:title>Article Title Here</news:title>
    </news:news>
  </url>
</urlset>
```

**Verification:**
- Visit the sitemap URL directly
- Check that it's listed in Search Console
- Confirm it's being crawled regularly

---

### ✅ Quality Scoring System

**Location:** `server/services/blog-automation.ts`

**Quality Criteria:**
- Content length and depth (minimum word count)
- Readability metrics (Flesch-Kincaid score)
- SEO optimization (meta tags, headers, keywords)
- Structure (proper use of headings, paragraphs, lists)
- Originality indicators
- Factual accuracy signals

**Scoring Threshold:**
- Articles with score **>7** are auto-published
- Articles with score **≤7** require manual review
- Rejected articles are flagged for improvement

**Benefits:**
- Ensures consistent quality standards
- Reduces need for manual content review
- Meets Google News quality requirements
- Protects site reputation

---

### ✅ RSS Feed Sources

**Location:** `server/services/blog-automation.ts` - RSS feed configurations

**Configured Sources (6 Belgian Financial Feeds):**
1. National Bank of Belgium (NBB) news
2. Belgian Financial Services and Markets Authority (FSMA)
3. Major Belgian financial news outlets
4. European Central Bank Belgium-relevant updates
5. Belgian fintech news sources
6. Consumer financial protection agencies

**Content Workflow:**
1. RSS feeds are checked every few hours
2. New articles are fetched and analyzed
3. Original commentary and analysis are added
4. Quality scoring determines publication
5. NewsArticle schema is applied
6. Articles are added to news sitemap

**Enhancement Process:**
- Original headlines are rewritten for Belgian audience
- Belgian context and implications are added
- Local regulatory impacts are explained
- Related Belgian financial products are referenced
- Links to relevant calculators on your site

---

### ✅ Innerlink Injection System

**Location:** `server/services/innerlink-service.ts`

**Purpose:**
- Automatically adds relevant internal links to articles
- Links to related blog posts
- Links to relevant calculators
- Improves site navigation and SEO
- Increases user engagement and time on site

**Implementation:**
- Analyzes article content for keywords
- Matches keywords to calculators and other articles
- Injects contextual links naturally
- Avoids over-linking (max 3-5 links per article)

**Benefits for Google News:**
- Demonstrates site depth and authority
- Encourages users to explore more content
- Reduces bounce rate
- Shows interconnected content ecosystem

---

### ✅ News Overview Page

**Location:** `client/src/pages/nieuws.tsx`

**Features:**
- Displays all recent news articles
- Filter by category (Sparen, Lenen, Beleggen, Planning)
- Search functionality
- Pagination or infinite scroll
- Mobile-responsive grid layout
- Integration with blog automation system

**SEO Optimization:**
- Proper title and meta description
- Breadcrumb navigation
- Schema markup for collection page
- Fast load times

**User Experience:**
- Clean, professional design
- Easy filtering and navigation
- Quick access to latest financial news
- Related content suggestions

---

### Technical Verification Checklist

Before submitting to Google News, verify:

**✅ Schema Markup:**
- [ ] Test at least 5 recent articles in Rich Results Test
- [ ] No errors or critical warnings
- [ ] All required NewsArticle properties present
- [ ] Images meet size requirements (1200px+ width)

**✅ News Sitemap:**
- [ ] Accessible at /news-sitemap.xml
- [ ] Submitted in Google Search Console
- [ ] Contains only articles from last 7 days
- [ ] Updates automatically with new content
- [ ] No XML errors

**✅ Performance:**
- [ ] Page load time <3 seconds
- [ ] Mobile-friendly (test with Google's tool)
- [ ] Core Web Vitals meet thresholds
- [ ] No server errors or downtime

**✅ Content Quality:**
- [ ] 30+ published articles minimum
- [ ] All articles score >7 in quality system
- [ ] Consistent publishing schedule (3-5 articles/day)
- [ ] Original analysis, not just aggregation

**✅ Site Policies:**
- [ ] Privacy policy accessible and complete
- [ ] Terms of service clearly stated
- [ ] Author bio and contact information available
- [ ] Copyright and attribution policies clear

**✅ robots.txt:**
- [ ] Allows Googlebot-News
- [ ] Includes sitemap reference
- [ ] No accidental blocking of important pages

---

## Additional Resources

### Official Google Documentation

- **Publisher Center Help:** https://support.google.com/news/publisher-center
- **Content Policies:** https://support.google.com/news/publisher-center/answer/9607025
- **Technical Requirements:** https://support.google.com/news/publisher-center/answer/9606710
- **Best Practices:** https://support.google.com/news/publisher-center/answer/9607104

### Testing Tools

- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Sitemap Validator:** Use Search Console sitemap report

### Schema Resources

- **Schema.org NewsArticle:** https://schema.org/NewsArticle
- **Google NewsArticle Guide:** https://developers.google.com/search/docs/appearance/structured-data/article
- **JSON-LD Validator:** https://validator.schema.org/

### Community Resources

- **Google News Publisher Forum:** https://support.google.com/news/community
- **SEO for News Sites:** Search Engine Journal, Search Engine Land
- **Belgian News Industry:** VDP (Vlaamse Dagbladpers), AJP (Association des Journalistes Professionnels)

---

## Final Checklist Before Submission

Use this checklist to ensure you're ready to submit:

### Content Readiness
- [ ] 30+ high-quality articles published
- [ ] Consistent 3-5 articles per day for 2+ weeks
- [ ] All articles have proper author attribution
- [ ] Content focused on Belgian financial topics
- [ ] No duplicate or plagiarized content
- [ ] Professional editorial standards maintained

### Technical Readiness
- [ ] NewsArticle schema implemented and tested
- [ ] News sitemap generating correctly
- [ ] Site verified in Publisher Center
- [ ] HTTPS enabled across entire site
- [ ] Mobile-responsive design confirmed
- [ ] Fast page load times (<3 seconds)

### Policy Compliance
- [ ] Content follows Google News policies
- [ ] Privacy policy published and accessible
- [ ] Terms of service clearly stated
- [ ] No prohibited content types
- [ ] Transparent authorship and dates
- [ ] Fact-based, accurate reporting

### Analytics Setup
- [ ] Google Analytics installed
- [ ] Google Search Console property created
- [ ] Tracking for Google News traffic configured
- [ ] Performance monitoring plan established

---

## Conclusion

Submitting to Google News Publisher Center is a multi-step process that requires:

1. **Technical Excellence:** Proper schema markup, sitemaps, and site performance
2. **Content Quality:** High-quality, original, Belgian-focused financial journalism
3. **Policy Compliance:** Adherence to Google News content standards
4. **Consistency:** Regular publishing schedule with quality content
5. **Patience:** Review process takes 2-4 weeks

Your site (interesten.be) already has the technical foundation in place with:
- ✅ NewsArticle schema implementation
- ✅ Automated news sitemap generation
- ✅ Quality scoring system
- ✅ RSS feed integration with original analysis
- ✅ Professional site structure and design

**Next Steps:**
1. Build content library to 30+ articles over 2-3 weeks
2. Verify site ownership using your preferred method
3. Submit publication for review
4. Continue publishing consistently while waiting
5. Monitor Search Console and Publisher Center for updates

**Success Factors:**
- **Quality over quantity** - Better to publish 3 excellent articles than 10 mediocre ones
- **Consistency** - Maintain regular publishing schedule
- **Belgian focus** - Content relevant to your local audience performs best
- **Patience** - The review process takes time, but quality publications get approved

Good luck with your Google News submission! With your existing technical implementation and a commitment to quality content, interesten.be is well-positioned for approval.

---

**Questions or Issues?**

If you encounter problems during the submission process:
1. Review this guide for troubleshooting solutions
2. Check Google's official Publisher Center help documentation
3. Use the Publisher Center support contact form
4. Review your site against the technical checklist
5. Ensure consistent content quality and publishing frequency

**Document Version:** 1.0  
**Last Updated:** October 31, 2025  
**For:** Interesten.be - Belgian Financial Information Platform
