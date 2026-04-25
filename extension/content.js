// TrustIndex Browser Extension - Content Script
class TrustBadge {
  constructor() {
    this.badge = null;
    this.currentDomain = window.location.hostname;
    this.init();
  }

  init() {
    // Wait a bit for the page to load
    setTimeout(() => {
      this.createBadge();
      this.analyzeSite();
    }, 2000);
  }

  createBadge() {
    // Create the trust badge element
    this.badge = document.createElement('div');
    this.badge.id = 'trustindex-badge';
    this.badge.innerHTML = `
      <div class="trustindex-container">
        <div class="trustindex-header">
          <span class="trustindex-logo">TI</span>
          <span class="trustindex-title">TrustIndex</span>
        </div>
        <div class="trustindex-score">
          <div class="score-circle">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#ffffff0f" stroke-width="4"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke="#8a8799" stroke-width="4"
                stroke-dasharray="163.36 163.36" stroke-linecap="round"
                style="transition:stroke-dasharray 1s cubic-bezier(.4,0,.2,1)"/>
            </svg>
            <div class="score-number">
              <span class="score-val">--</span>
              <span class="score-label">/ 100</span>
            </div>
          </div>
        </div>
        <div class="trustindex-status">Analyzing...</div>
      </div>
    `;

    // Add styles matching the web app theme
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

      #trustindex-badge {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2147483647;
        font-family: var(--sans, 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        background: var(--surface, #12121a);
        border: 0.5px solid var(--border2, #ffffff22);
        border-radius: 12px;
        padding: 14px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        min-width: 220px;
        transition: all 0.3s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
      }

      #trustindex-badge::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
        opacity: 0.6;
        border-radius: 12px;
      }

      #trustindex-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
        border-color: var(--border2, #ffffff44);
      }

      .trustindex-container {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .trustindex-header {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
        padding-bottom: 6px;
        border-bottom: 0.5px solid var(--border, #ffffff12);
      }

      .trustindex-logo {
        font-family: var(--serif, 'DM Serif Display', serif);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--accent, #c8f064);
      }

      .trustindex-title {
        font-family: var(--mono, 'DM Mono', monospace);
        font-size: 10px;
        color: var(--muted, #8a8799);
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .trustindex-score {
        display: flex;
        justify-content: center;
        margin: 12px 0;
      }

      .score-circle {
        position: relative;
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .score-circle svg {
        transform: rotate(-90deg);
      }

      .score-number {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .score-val {
        font-family: var(--serif, 'DM Serif Display', serif);
        font-size: 20px;
        line-height: 1;
        color: var(--text, #f0ede8);
      }

      .score-label {
        font-size: 8px;
        font-family: var(--mono, 'DM Mono', monospace);
        color: var(--muted, #8a8799);
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .trustindex-status {
        font-size: 11px;
        color: var(--muted, #8a8799);
        text-align: center;
        line-height: 1.4;
        font-family: var(--sans, 'Instrument Sans', sans-serif);
      }

      .trustindex-grade {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 10px;
        font-family: var(--mono, 'DM Mono', monospace);
        font-weight: 500;
        margin-top: 6px;
        background: var(--accent, #c8f06422);
        color: var(--accent, #c8f064);
      }

      .trustindex-grade.grade-b { 
        background: var(--accent2, #7c6fec22); 
        color: var(--accent2, #a89df0); 
      }
      .trustindex-grade.grade-c { 
        background: #ffc44d22; 
        color: #ffc44d; 
      }
      .trustindex-grade.grade-d { 
        background: #ff5f5722; 
        color: #ff5f57; 
      }

      /* Modal styles */
      .trustindex-modal {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: rgba(10, 10, 15, 0.8) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        backdrop-filter: blur(4px) !important;
      }

      .trustindex-modal::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        opacity: 0.6;
      }

      .trustindex-modal-content {
        background: var(--surface, #12121a) !important;
        border: 0.5px solid var(--border2, #ffffff22) !important;
        border-radius: 16px !important;
        padding: 32px !important;
        max-width: 600px !important;
        max-height: 85vh !important;
        overflow-y: auto !important;
        color: var(--text, #f0ede8) !important;
        font-family: var(--sans, 'Instrument Sans', sans-serif) !important;
        position: relative;
        z-index: 1;
      }

      .trustindex-modal-content::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        opacity: 0.6;
        border-radius: 16px;
        z-index: -1;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        #trustindex-badge {
          top: 10px !important;
          right: 10px !important;
          min-width: 180px !important;
          padding: 10px !important;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        #trustindex-badge {
          transition: none !important;
        }
        #trustindex-badge:hover {
          transform: none !important;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.badge);

    // Add click handler to expand details
    this.badge.addEventListener('click', () => {
      this.showDetailedReport();
    });
  }

  async analyzeSite() {
    try {
      // Send message to background script to get trust score
      const response = await chrome.runtime.sendMessage({
        action: 'analyzeSite',
        domain: this.currentDomain
      });

      if (response && response.score) {
        this.updateBadge(response);
      } else {
        this.showFallback();
      }
    } catch (error) {
      console.error('TrustIndex analysis failed:', error);
      this.showFallback();
    }
  }

  updateBadge(data) {
    const scoreElement = this.badge.querySelector('.score-val');
    const statusElement = this.badge.querySelector('.trustindex-status');
    const scoreCircle = this.badge.querySelector('.score-circle svg circle:last-child');

    scoreElement.textContent = data.score;

    // Update SVG progress circle
    const r = 26;
    const circ = 2 * Math.PI * r;
    const dash = (data.score / 100) * circ;
    const color = this.getScoreColor(data.score);

    scoreCircle.setAttribute('stroke-dasharray', `${dash} ${circ - dash}`);
    scoreCircle.setAttribute('stroke', color);

    // Update status with company name
    statusElement.textContent = data.companyName || this.currentDomain;

    // Add grade badge
    const gradeClass = this.getGradeClass(data.score);
    const gradeLabel = this.getGradeLabel(data.score);

    const gradeElement = document.createElement('div');
    gradeElement.className = `trustindex-grade ${gradeClass}`;
    gradeElement.textContent = gradeLabel;

    // Remove existing grade if any
    const existingGrade = this.badge.querySelector('.trustindex-grade');
    if (existingGrade) {
      existingGrade.remove();
    }

    this.badge.querySelector('.trustindex-container').appendChild(gradeElement);
  }

  showFallback() {
    const scoreElement = this.badge.querySelector('.score-val');
    const statusElement = this.badge.querySelector('.trustindex-status');

    scoreElement.textContent = '?';
    statusElement.textContent = 'Analysis unavailable';
  }

  getScoreColor(score) {
    if (score >= 75) return 'var(--green, #c8f064)';
    if (score >= 50) return 'var(--amber, #ffc44d)';
    return 'var(--red, #ff5f57)';
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

  showDetailedReport() {
    // Create a modal with detailed report matching web app theme
    const modal = document.createElement('div');
    modal.className = 'trustindex-modal';

    const content = document.createElement('div');
    content.className = 'trustindex-modal-content';

    content.innerHTML = `
      <div class="header" style="display: flex; align-items: baseline; gap: 16px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 0.5px solid var(--border, #ffffff12);">
        <div class="logo" style="font-family: var(--serif, 'DM Serif Display', serif); font-size: 24px; letter-spacing: -0.01em; color: var(--text, #f0ede8);">Trust<span style="color: var(--accent, #c8f064);">Index</span></div>
        <div class="tagline" style="font-size: 12px; color: var(--muted, #8a8799); font-family: var(--mono, 'DM Mono', monospace); letter-spacing: 0.06em; text-transform: uppercase;">Privacy intelligence report</div>
      </div>
      
      <div class="section" style="margin-bottom: 20px;">
        <h3 style="font-family: var(--serif, 'DM Serif Display', serif); font-size: 18px; margin: 0 0 8px 0; color: var(--text, #f0ede8);">Detailed Analysis</h3>
        <p style="margin: 0 0 16px 0; color: var(--muted, #8a8799); font-size: 14px;">Comprehensive privacy assessment for <strong style="color: var(--text, #f0ede8);">${this.currentDomain}</strong></p>
      </div>

      <div class="score-hero" style="display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; margin-bottom: 24px; padding: 20px; background: var(--surface, #12121a); border: 0.5px solid var(--border, #ffffff12); border-radius: 12px;">
        <div class="score-circle" style="position: relative; width: 80px; height: 80px; flex-shrink: 0;">
          <svg width="80" height="80" viewBox="0 0 80 80" style="transform: rotate(-90deg);">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#ffffff0f" stroke-width="6"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="#8a8799" stroke-width="6"
              stroke-dasharray="201.06 201.06" stroke-linecap="round"
              style="transition:stroke-dasharray 1s cubic-bezier(.4,0,.2,1)"/>
          </svg>
          <div class="score-number" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <span class="score-val" style="font-family: var(--serif, 'DM Serif Display', serif); font-size: 24px; line-height: 1; color: var(--text, #f0ede8);">--</span>
            <span class="score-label" style="font-size: 10px; font-family: var(--mono, 'DM Mono', monospace); color: var(--muted, #8a8799); letter-spacing: 0.06em; text-transform: uppercase;">/ 100</span>
          </div>
        </div>
        <div class="score-meta" style="display: flex; flex-direction: column; gap: 8px;">
          <div class="company-name" style="font-family: var(--serif, 'DM Serif Display', serif); font-size: 20px; line-height: 1.1; color: var(--text, #f0ede8);">Loading...</div>
          <div class="score-verdict" style="font-size: 14px; color: var(--muted, #8a8799); line-height: 1.5;">Analyzing privacy practices...</div>
        </div>
      </div>

      <div class="actions" style="display: flex; gap: 12px; margin-top: 24px;">
        <button id="trustindex-close" style="
          background: var(--accent, #c8f064);
          color: #0a0a0f;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-family: var(--sans, 'Instrument Sans', sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        ">Close Report</button>
        <button id="trustindex-full-report" style="
          background: var(--accent2, #7c6fec);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-family: var(--sans, 'Instrument Sans', sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        ">View Full Analysis</button>
      </div>

      <div id="trustindex-details" style="margin-top: 24px;">
        <div class="loading" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; gap: 12px;">
          <div class="spinner" style="width: 32px; height: 32px; border: 2px solid var(--border, #ffffff12); border-top-color: var(--accent, #c8f064); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <div class="loading-text" style="font-family: var(--mono, 'DM Mono', monospace); font-size: 12px; color: var(--muted, #8a8799); letter-spacing: 0.06em;">Loading detailed privacy analysis...</div>
        </div>
      </div>

      <div class="disclaimer" style="font-size: 11px; font-family: var(--mono, 'DM Mono', monospace); color: var(--muted, #8a8799); opacity: 0.6; text-align: center; margin-top: 24px; padding-top: 16px; border-top: 0.5px solid var(--border, #ffffff12); line-height: 1.6;">
        TrustIndex provides privacy intelligence based on publicly available information. This is not legal advice. Scores are indicative and for informational purposes only.
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Load detailed data
    this.loadDetailedReport();

    // Event handlers
    document.getElementById('trustindex-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    document.getElementById('trustindex-full-report').addEventListener('click', () => {
      chrome.runtime.sendMessage({
        action: 'openFullReport',
        domain: this.currentDomain
      });
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  async loadDetailedReport() {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'analyzeSite',
        domain: this.currentDomain
      });

      if (response && response.score) {
        this.updateModalReport(response);
      }
    } catch (error) {
      console.error('Failed to load detailed report:', error);
    }
  }

  updateModalReport(data) {
    const scoreVal = document.querySelector('.trustindex-modal-content .score-val');
    const scoreCircle = document.querySelector('.trustindex-modal-content .score-circle svg circle:last-child');
    const companyName = document.querySelector('.trustindex-modal-content .company-name');
    const verdict = document.querySelector('.trustindex-modal-content .score-verdict');
    const details = document.getElementById('trustindex-details');

    if (scoreVal) scoreVal.textContent = data.score;
    if (companyName) companyName.textContent = data.companyName || this.currentDomain;
    if (verdict) verdict.textContent = data.verdict || 'Privacy analysis complete.';

    // Update score circle
    if (scoreCircle) {
      const r = 32;
      const circ = 2 * Math.PI * r;
      const dash = (data.score / 100) * circ;
      const color = this.getScoreColor(data.score);

      scoreCircle.setAttribute('stroke-dasharray', `${dash} ${circ - dash}`);
      scoreCircle.setAttribute('stroke', color);
    }

    // Update details section
    if (details && data.dimensions) {
      details.innerHTML = `
        <div class="dims" style="display: grid; grid-template-columns: 1fr; gap: 12px;">
          ${Object.entries(data.dimensions).map(([key, dim]) => `
            <div class="dim-card" style="background: var(--surface, #12121a); border: 0.5px solid var(--border, #ffffff12); border-radius: 10px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-family: var(--mono, 'DM Mono', monospace); color: var(--muted, #8a8799); text-transform: uppercase; letter-spacing: 0.06em;">${this.formatDimensionName(key)}</span>
                <span style="font-family: var(--serif, 'DM Serif Display', serif); font-size: 18px; color: ${this.getScoreColor(dim.score)};">${dim.score}</span>
              </div>
              <div style="height: 3px; background: var(--border2, #ffffff22); border-radius: 2px; overflow: hidden; margin-bottom: 10px;">
                <div style="height: 100%; border-radius: 2px; transition: width 1s cubic-bezier(.4,0,.2,1); width: ${dim.score}%; background: ${this.getScoreColor(dim.score)};"></div>
              </div>
              <div style="font-size: 12px; color: var(--muted, #8a8799); line-height: 1.5;">${dim.note}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  formatDimensionName(key) {
    const names = {
      policyClarity: 'Policy Clarity',
      dataMinimisation: 'Data Minimisation',
      userControl: 'User Control',
      thirdPartySharing: '3rd Party Sharing',
      regulatoryCompliance: 'Regulatory Compliance'
    };
    return names[key] || key;
  }
}

// Initialize the badge
new TrustBadge();
