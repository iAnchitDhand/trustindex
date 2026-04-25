import axios from 'axios';

export class PrivacyPolicyScraper {
  private static readonly POLICY_SELECTORS = [
    'a[href*="privacy"]',
    'a[href*="policy"]',
    'a[href*="legal"]',
    '[data-testid*="privacy"]',
    '.privacy-policy',
    '#privacy-policy'
  ];

  static async scrapePrivacyPolicy(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const html = response.data;

      // Extract text content from HTML
      const textContent = this.extractTextFromHTML(html);

      // Look for privacy policy links and extract content
      const policyContent = await this.extractPolicyContent(html, url);

      return policyContent || textContent;
    } catch (error) {
      console.error('Failed to scrape privacy policy:', error);
      return '';
    }
  }

  private static extractTextFromHTML(html: string): string {
    // Remove script and style tags
    const cleanHTML = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ');

    // Clean up whitespace
    return cleanHTML.replace(/\s+/g, ' ').trim();
  }

  private static async extractPolicyContent(html: string, baseUrl: string): Promise<string> {
    // This is a simplified implementation
    // In a real-world scenario, you'd want to:
    // 1. Parse the HTML properly
    // 2. Find privacy policy links
    // 3. Fetch and parse those pages
    // 4. Extract relevant sections

    // For now, return the main page content
    return this.extractTextFromHTML(html);
  }

  static async findPrivacyPolicyUrl(domain: string): Promise<string | null> {
    const commonPaths = [
      '/privacy',
      '/privacy-policy',
      '/legal/privacy',
      '/privacy.html',
      '/privacy.php'
    ];

    for (const path of commonPaths) {
      try {
        const url = `https://${domain}${path}`;
        const response = await axios.head(url, { timeout: 5000 });
        if (response.status === 200) {
          return url;
        }
      } catch (error) {
        // Continue to next path
      }
    }

    return null;
  }
}