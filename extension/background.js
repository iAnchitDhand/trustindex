// TrustIndex Browser Extension - Background Script

class BackgroundService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutes
    this.init();
  }

  init() {
    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep the message channel open for async response
    });

    // Clean up cache periodically
    setInterval(() => {
      this.cleanCache();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  async handleMessage(request, sender, sendResponse) {
    try {
      switch (request.action) {
        case 'analyzeSite':
          const analysis = await this.analyzeSite(request.domain);
          sendResponse(analysis);
          break;

        case 'openFullReport':
          this.openFullReport(request.domain);
          sendResponse({ success: true });
          break;

        default:
          sendResponse({ error: 'Unknown action' });
      }
    } catch (error) {
      console.error('Background service error:', error);
      sendResponse({ error: error.message });
    }
  }

  async analyzeSite(domain) {
    // Check cache first
    const cached = this.cache.get(domain);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Get API key from storage
      const { claudeApiKey } = await this.getStorageData(['claudeApiKey']);

      if (!claudeApiKey) {
        return this.getFallbackAnalysis(domain);
      }

      // Perform analysis
      const analysis = await this.performAnalysis(domain, claudeApiKey);

      // Cache the result
      this.cache.set(domain, {
        data: analysis,
        timestamp: Date.now()
      });

      return analysis;
    } catch (error) {
      console.error('Analysis failed:', error);
      return this.getFallbackAnalysis(domain);
    }
  }

  async performAnalysis(domain, apiKey) {
    // This would integrate with your TrustIndex API
    // For now, we'll simulate with a mock analysis

    const mockAnalysis = {
      score: this.generateMockScore(domain),
      companyName: this.getCompanyName(domain),
      domain: domain,
      timestamp: Date.now()
    };

    return mockAnalysis;
  }

  generateMockScore(domain) {
    // Generate a consistent but pseudo-random score based on domain
    let hash = 0;
    for (let i = 0; i < domain.length; i++) {
      hash = ((hash << 5) - hash) + domain.charCodeAt(i);
      hash = hash & hash;
    }

    // Map to score range (30-95)
    return 30 + (Math.abs(hash) % 66);
  }

  getCompanyName(domain) {
    const parts = domain.split('.');
    const name = parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getFallbackAnalysis(domain) {
    return {
      score: 45,
      companyName: this.getCompanyName(domain),
      domain: domain,
      timestamp: Date.now(),
      fallback: true
    };
  }

  openFullReport(domain) {
    // Open the TrustIndex web app with the domain pre-filled
    const url = `https://trustindex.example.com/?domain=${encodeURIComponent(domain)}`;
    chrome.tabs.create({ url });
  }

  async getStorageData(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, resolve);
    });
  }

  cleanCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }
}

// Initialize the background service
new BackgroundService();
