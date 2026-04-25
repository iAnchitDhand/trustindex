# TrustIndex - Privacy Intelligence Platform

A comprehensive trust scoring system for digital platforms that aggregates breach history, policy clarity, data minimisation signals, and compliance metrics.

## Features

- **Live Trust Scoring**: Enter any company name to get instant privacy trust scores
- **AI-Powered Analysis**: Claude API analyzes privacy policies for clarity and red flags
- **Breach History**: Integration with HaveIBeenPwned API for comprehensive breach data
- **Composite Scoring**: Multi-dimensional analysis across 5 key privacy dimensions
- **Browser Extension**: Mini trust badge that appears on any website you visit
- **Beautiful UI**: Modern dark theme with responsive design

## Tech Stack

- **Frontend**: React with TypeScript
- **API Integration**: Claude AI, HaveIBeenPwned
- **Web Scraping**: Privacy policy extraction and analysis
- **Browser Extension**: Chrome Extension with Manifest V3
- **Styling**: Custom CSS with modern design system

## Quick Start

### Prerequisites

- Node.js 16+
- Claude API key (optional, for enhanced analysis)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Browser Extension

1. Navigate to the `extension` directory
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension` folder
5. The trust badge will appear on websites you visit

## Usage

### Web Application

1. Enter a company name or domain (e.g., "facebook.com", "zomato.com")
2. Click "Analyse" to get comprehensive privacy score
3. View detailed breakdown across 5 dimensions:
   - Policy Clarity
   - Data Minimisation
   - User Control
   - Third Party Sharing
   - Regulatory Compliance
4. Review breach history and key findings

### Browser Extension

1. Install the extension in Chrome
2. Visit any website
3. Look for the TrustIndex badge in the top-right corner
4. Click the badge for detailed analysis
5. Use the popup to analyze other sites

## API Configuration

### Claude API Key

For enhanced analysis, add your Claude API key:

1. In the web app: Set the `CLAUDE_API_KEY` environment variable
2. In the browser extension: Click the extension icon and enter your API key in settings

### HaveIBeenPwned

The application uses the HaveIBeenPwned API for breach data. No additional configuration required.

## Project Structure

```
trustindex/
src/
  components/          # React components
    ScoreCircle.tsx   # Circular score display
    DimensionCard.tsx # Individual dimension scores
    Finding.tsx       # Analysis findings
    BreachItem.tsx    # Breach history items
    TrustReport.tsx   # Complete trust report
  services/           # API and data services
    api.ts           # Claude and HIBP integration
    scraper.ts       # Privacy policy scraping
  types/             # TypeScript type definitions
  utils/             # Helper functions
  App.tsx           # Main application component
  App.css           # Application styles

extension/            # Chrome extension
  manifest.json     # Extension configuration
  content.js        # Trust badge content script
  background.js     # Background service worker
  popup.html        # Extension popup UI
  popup.js          # Popup logic
  styles.css        # Extension styles
  INSTALL.md        # Extension installation guide
```

## Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_CLAUDE_API_KEY=your_claude_api_key_here
```

## Privacy & Security

- No personal data is stored or transmitted
- Only domain names and public privacy policies are analyzed
- API keys are stored securely
- Results are cached locally for performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

1. Check the troubleshooting section
2. Create an issue on GitHub
3. Contact the development team

## Roadmap

- [ ] Support for more privacy policy sources
- [ ] Historical score tracking
- [ ] API for third-party integrations
- [ ] Mobile app development
- [ ] Advanced compliance checking