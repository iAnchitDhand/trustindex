// TrustIndex Browser Extension - Popup Script

class PopupController {
  constructor() {
    this.currentTab = null;
    this.analysis = null;
    this.init();
  }

  async init() {
    try {
      // Get current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      this.currentTab = tab;

      // Load analysis for current domain
      await this.loadAnalysis();

      // Render content
      this.renderContent();

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      console.error('Popup initialization failed:', error);
      this.showError('Failed to initialize TrustIndex');
    }
  }

  async loadAnalysis() {
    if (!this.currentTab) return;

    const domain = new URL(this.currentTab.url).hostname;

    try {
      // Request analysis from background script
      const response = await chrome.runtime.sendMessage({
        action: 'analyzeSite',
        domain: domain
      });

      this.analysis = response;
    } catch (error) {
      console.error('Failed to load analysis:', error);
      this.analysis = this.getFallbackAnalysis(domain);
    }
  }

  getFallbackAnalysis(domain) {
    return {
      score: 45,
      companyName: this.getCompanyName(domain),
      domain: domain,
      fallback: true
    };
  }

  getCompanyName(domain) {
    const parts = domain.split('.');
    const name = parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  renderContent() {
    const content = document.getElementById('content');

    if (!this.analysis) {
      content.innerHTML = `
        <div class="error">
          Unable to load TrustIndex analysis. Please try refreshing the page.
        </div>
      `;
      return;
    }

    const gradeClass = this.getGradeClass(this.analysis.score);
    const gradeLabel = this.getGradeLabel(this.analysis.score);

    content.innerHTML = `
      <div class="current-site">
        <div class="site-name">Current Site</div>
        <div class="site-domain">${this.analysis.domain}</div>
      </div>

      <div class="score-display">
        <div class="score-circle">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#ffffff0f" stroke-width="4"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="${this.getScoreColor(this.analysis.score)}" stroke-width="4"
              stroke-dasharray="${(this.analysis.score / 100) * 201.06} ${201.06 - (this.analysis.score / 100) * 201.06}" stroke-linecap="round"
              style="transition:stroke-dasharray 1s cubic-bezier(.4,0,.2,1)"/>
          </svg>
          <div class="score-number">
            <span class="score-value">${this.analysis.score}</span>
            <span class="score-label">/ 100</span>
          </div>
        </div>
      </div>

      <div class="grade-badge ${gradeClass}">${gradeLabel}</div>

      <div class="actions">
        <button class="btn" id="viewFullReport">
          View Full Report
        </button>
        <button class="btn btn-secondary" id="analyzeAnother">
          Analyze Another Site
        </button>
      </div>

      ${this.analysis.fallback ? `
        <div class="error">
          Live analysis unavailable. Showing cached or fallback data.
        </div>
      ` : ''}

      <div class="settings">
        <div class="settings-title">Settings</div>
        <div class="input-group">
          <label class="input-label" for="apiKey">Claude API Key (Optional)</label>
          <input type="password" id="apiKey" class="input" placeholder="Enter your Claude API key">
        </div>
        <button class="btn btn-secondary" id="saveSettings">
          Save Settings
        </button>
      </div>
    `;
  }

  setupEventListeners() {
    // View full report
    const viewReportBtn = document.getElementById('viewFullReport');
    if (viewReportBtn) {
      viewReportBtn.addEventListener('click', () => {
        this.openFullReport();
      });
    }

    // Analyze another site
    const analyzeBtn = document.getElementById('analyzeAnother');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => {
        this.openTrustIndexApp();
      });
    }

    // Save settings
    const saveBtn = document.getElementById('saveSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveSettings();
      });
    }

    // Load saved API key
    this.loadSettings();
  }

  openFullReport() {
    if (this.currentTab) {
      chrome.runtime.sendMessage({
        action: 'openFullReport',
        domain: this.analysis.domain
      });
    }
  }

  openTrustIndexApp() {
    chrome.tabs.create({
      url: 'https://trustindex.example.com'
    });
  }

  async saveSettings() {
    const apiKeyInput = document.getElementById('apiKey');
    const apiKey = apiKeyInput.value.trim();

    try {
      await chrome.storage.local.set({ claudeApiKey: apiKey });

      // Show success feedback
      const saveBtn = document.getElementById('saveSettings');
      const originalText = saveBtn.textContent;
      saveBtn.textContent = 'Saved!';
      saveBtn.style.background = '#c8f064';

      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
      }, 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  async loadSettings() {
    try {
      const { claudeApiKey } = await chrome.storage.local.get(['claudeApiKey']);
      const apiKeyInput = document.getElementById('apiKey');
      if (apiKeyInput && claudeApiKey) {
        apiKeyInput.value = claudeApiKey;
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  showError(message) {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="error">
        ${message}
      </div>
    `;
  }

  getGradeClass(score) {
    if (score >= 85) return '';
    if (score >= 70) return 'grade-b';
    if (score >= 50) return 'grade-c';
    return 'grade-d';
  }

  getGradeLabel(score) {
    if (score >= 85) return 'A - Trustworthy';
    if (score >= 70) return 'B - Acceptable';
    if (score >= 50) return 'C - Caution';
    return 'D - High Risk';
  }

  getScoreColor(score) {
    if (score >= 75) return 'var(--green, #c8f064)';
    if (score >= 50) return 'var(--amber, #ffc44d)';
    return 'var(--red, #ff5f57)';
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});