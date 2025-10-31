import { findCalculatorsByKeywords, type Calculator } from '../../shared/calculator-registry';

interface LinkedCalculator {
  slug: string;
  title: string;
  anchorText: string;
}

interface InnerLinkResult {
  modifiedHtml: string;
  linkedCalculators: LinkedCalculator[];
  linkCount: number;
}

interface ParagraphInfo {
  content: string;
  startIndex: number;
  endIndex: number;
  hasLink: boolean;
}

const MIN_LINKS = 3;
const MAX_LINKS = 5;
const MIN_RELEVANCE_THRESHOLD = 5;

function normalizeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function extractParagraphs(html: string): ParagraphInfo[] {
  const paragraphs: ParagraphInfo[] = [];
  const pTagRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;

  while ((match = pTagRegex.exec(html)) !== null) {
    const content = match[1];
    const hasExistingLink = /<a\s+[^>]*>.*?<\/a>/i.test(content);
    
    paragraphs.push({
      content: content,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      hasLink: hasExistingLink
    });
  }

  return paragraphs;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function findKeywordInText(text: string, keywords: string[]): { keyword: string; index: number; length: number } | null {
  const normalizedText = normalizeDiacritics(text.toLowerCase());
  
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  
  for (const keyword of sortedKeywords) {
    if (keyword.length < 4) continue;
    
    const normalizedKeyword = normalizeDiacritics(keyword.toLowerCase());
    const regex = new RegExp(`\\b${normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const match = normalizedText.match(regex);
    
    if (match && match.index !== undefined) {
      const actualText = text.substring(match.index, match.index + keyword.length);
      return {
        keyword: actualText,
        index: match.index,
        length: actualText.length
      };
    }
  }
  
  return null;
}

function injectLinkIntoParagraph(paragraphHtml: string, keyword: string, calculator: Calculator): string {
  const plainText = stripHtmlTags(paragraphHtml);
  const keywordMatch = findKeywordInText(plainText, [keyword]);
  
  if (!keywordMatch) {
    return paragraphHtml;
  }

  let currentPos = 0;
  let textPos = 0;
  let injected = false;
  let result = '';
  
  const htmlParts: Array<{ type: 'tag' | 'text', content: string }> = [];
  const tagRegex = /<[^>]+>/g;
  let lastIndex = 0;
  let tagMatch;
  
  while ((tagMatch = tagRegex.exec(paragraphHtml)) !== null) {
    if (tagMatch.index > lastIndex) {
      htmlParts.push({ type: 'text', content: paragraphHtml.substring(lastIndex, tagMatch.index) });
    }
    htmlParts.push({ type: 'tag', content: tagMatch[0] });
    lastIndex = tagMatch.index + tagMatch[0].length;
  }
  
  if (lastIndex < paragraphHtml.length) {
    htmlParts.push({ type: 'text', content: paragraphHtml.substring(lastIndex) });
  }

  for (const part of htmlParts) {
    if (part.type === 'tag') {
      result += part.content;
    } else {
      const textContent = part.content;
      const targetPos = keywordMatch.index - textPos;
      
      if (!injected && targetPos >= 0 && targetPos < textContent.length) {
        const before = textContent.substring(0, targetPos);
        const keywordText = textContent.substring(targetPos, targetPos + keywordMatch.length);
        const after = textContent.substring(targetPos + keywordMatch.length);
        
        const link = `<a href="${calculator.url}" class="blog-innerlink" target="_blank" rel="noopener noreferrer">${keywordText}</a>`;
        result += before + link + after;
        injected = true;
      } else {
        result += textContent;
      }
      
      textPos += textContent.length;
    }
  }
  
  return injected ? result : paragraphHtml;
}

function selectCalculatorsForLinking(
  calculatorsWithScores: Array<{ calculator: Calculator; score: number }>,
  allText: string
): Array<{ calculator: Calculator; score: number; keyword: string }> {
  const selectedCalcs: Array<{ calculator: Calculator; score: number; keyword: string }> = [];
  const usedCalculators = new Set<string>();

  for (const { calculator, score } of calculatorsWithScores) {
    if (score < MIN_RELEVANCE_THRESHOLD) {
      continue;
    }

    if (usedCalculators.has(calculator.slug)) {
      continue;
    }

    const keywordMatch = findKeywordInText(allText, calculator.keywords);
    
    if (keywordMatch) {
      selectedCalcs.push({
        calculator,
        score,
        keyword: keywordMatch.keyword
      });
      usedCalculators.add(calculator.slug);
    }

    if (selectedCalcs.length >= MAX_LINKS) {
      break;
    }
  }

  return selectedCalcs.slice(0, MAX_LINKS);
}

function distributeLinksThroughoutContent(
  paragraphs: ParagraphInfo[],
  selectedCalculators: Array<{ calculator: Calculator; score: number; keyword: string }>
): Map<number, { calculator: Calculator; keyword: string }> {
  const distribution = new Map<number, { calculator: Calculator; keyword: string }>();
  
  const eligibleParagraphs = paragraphs
    .map((p, index) => ({ paragraph: p, index }))
    .filter(({ paragraph }) => {
      const plainText = stripHtmlTags(paragraph.content);
      return plainText.length > 50 && !paragraph.hasLink;
    });

  if (eligibleParagraphs.length === 0) {
    return distribution;
  }

  const step = Math.max(1, Math.floor(eligibleParagraphs.length / selectedCalculators.length));
  
  let eligibleIndex = 0;
  for (const { calculator, keyword } of selectedCalculators) {
    let found = false;
    
    for (let offset = 0; offset < eligibleParagraphs.length && !found; offset++) {
      const checkIndex = (eligibleIndex + offset) % eligibleParagraphs.length;
      const { paragraph, index } = eligibleParagraphs[checkIndex];
      
      if (distribution.has(index)) {
        continue;
      }
      
      const plainText = stripHtmlTags(paragraph.content);
      const keywordMatch = findKeywordInText(plainText, [keyword]);
      
      if (keywordMatch) {
        distribution.set(index, { calculator, keyword });
        found = true;
        eligibleIndex = (checkIndex + step) % eligibleParagraphs.length;
      }
    }
  }
  
  return distribution;
}

export async function injectInnerLinks(htmlContent: string): Promise<InnerLinkResult> {
  if (!htmlContent || htmlContent.trim().length === 0) {
    return {
      modifiedHtml: htmlContent,
      linkedCalculators: [],
      linkCount: 0
    };
  }

  const paragraphs = extractParagraphs(htmlContent);
  
  if (paragraphs.length === 0) {
    return {
      modifiedHtml: htmlContent,
      linkedCalculators: [],
      linkCount: 0
    };
  }

  const allText = paragraphs.map(p => stripHtmlTags(p.content)).join(' ');
  
  const relevantCalculatorsWithScores = findCalculatorsByKeywords(allText, 10);
  
  if (relevantCalculatorsWithScores.length === 0) {
    return {
      modifiedHtml: htmlContent,
      linkedCalculators: [],
      linkCount: 0
    };
  }

  const selectedCalculators = selectCalculatorsForLinking(relevantCalculatorsWithScores, allText);
  
  if (selectedCalculators.length < MIN_LINKS && selectedCalculators.length < relevantCalculatorsWithScores.length) {
    console.log(`Only found ${selectedCalculators.length} calculators to link (minimum ${MIN_LINKS})`);
  }

  console.log(`Relevance filtering: ${relevantCalculatorsWithScores.length} candidates, ${selectedCalculators.length} above threshold (≥${MIN_RELEVANCE_THRESHOLD})`);

  const linkDistribution = distributeLinksThroughoutContent(paragraphs, selectedCalculators);

  let modifiedHtml = htmlContent;
  const linkedCalculators: LinkedCalculator[] = [];
  let offset = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const linkInfo = linkDistribution.get(i);
    
    if (linkInfo) {
      const paragraph = paragraphs[i];
      const originalParagraphHtml = modifiedHtml.substring(
        paragraph.startIndex + offset,
        paragraph.endIndex + offset
      );
      
      const modifiedParagraphHtml = injectLinkIntoParagraph(
        paragraph.content,
        linkInfo.keyword,
        linkInfo.calculator
      );
      
      const pTagStart = originalParagraphHtml.indexOf('>') + 1;
      const pTagEnd = originalParagraphHtml.lastIndexOf('<');
      const newParagraphHtml = 
        originalParagraphHtml.substring(0, pTagStart) +
        modifiedParagraphHtml +
        originalParagraphHtml.substring(pTagEnd);

      modifiedHtml = 
        modifiedHtml.substring(0, paragraph.startIndex + offset) +
        newParagraphHtml +
        modifiedHtml.substring(paragraph.endIndex + offset);
      
      const lengthDiff = newParagraphHtml.length - originalParagraphHtml.length;
      offset += lengthDiff;
      
      linkedCalculators.push({
        slug: linkInfo.calculator.slug,
        title: linkInfo.calculator.title,
        anchorText: linkInfo.keyword
      });
    }
  }

  console.log(`Injected ${linkedCalculators.length} innerlinks into blog post`);
  linkedCalculators.forEach(calc => {
    console.log(`  - ${calc.title} (anchor: "${calc.anchorText}")`);
  });

  return {
    modifiedHtml,
    linkedCalculators,
    linkCount: linkedCalculators.length
  };
}
