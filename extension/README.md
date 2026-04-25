# TrustIndex Browser Extension

A Chrome extension that shows a mini trust badge for any website you visit, providing instant privacy intelligence.

## Features

- **Live Trust Badge**: Displays a floating trust badge on every website with privacy scores
- **Quick Analysis**: Shows company name, trust score, and grade at a glance
- **Detailed Reports**: Click the badge for comprehensive privacy analysis
- **Smart Caching**: Results are cached for 30 minutes to improve performance
- **Settings Panel**: Configure Claude API key for enhanced analysis

## Installation

### Development Mode

1. Clone this repository
2. Navigate to `trustindex/extension`
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked"
6. Select the `extension` directory

### Building for Production

1. Update the `manifest.json` with your production URLs
2. Zip the `extension` directory
3. Submit to Chrome Web Store

## Usage

1. Install the extension
2. Navigate to any website
3. Look for the TrustIndex badge in the top-right corner
4. Click the badge to see detailed analysis
5. Use the popup to analyze other sites or configure settings

## Configuration

### API Keys

For enhanced analysis, add your Claude API key:

1. Click the TrustIndex icon in your toolbar
2. Enter your Claude API key in the settings section
3. Click "Save Settings"

### Customization

You can customize the extension by modifying:

- `manifest.json`: Permissions and configuration
- `content.js`: Badge appearance and behavior
- `popup.html`: Extension popup design
- `background.js`: Analysis logic and caching

## Files Structure

```
extension/
  manifest.json          # Extension configuration
  content.js            # Content script for trust badge
  background.js         # Background service worker
  popup.html           # Extension popup UI
  popup.js             # Popup script logic
  styles.css           # Global styles
  README.md            # This file
  INSTALL.md           # Installation guide
```

## API Integration

The extension integrates with:

- **Claude API**: Privacy policy analysis
- **HaveIBeenPwned API**: Data breach history
- **TrustIndex API**: Composite scoring

## Privacy & Security

- No personal data is stored
- Analysis is cached locally
- API keys are stored securely in Chrome storage
- Only domain names are sent for analysis

## Troubleshooting

### Badge not appearing

1. Check if the extension is enabled
2. Refresh the page
3. Check browser console for errors

### Analysis failing

1. Verify your Claude API key
2. Check network connectivity
3. Try clearing the extension cache

### Performance issues

1. The extension caches results for 30 minutes
2. Disable on pages where it's not needed
3. Check for conflicting extensions

## Development

### Testing

```bash
# Load in developer mode
# Navigate to chrome://extensions/
# Click "Load unpacked" and select the directory
```

### Building

```bash
# Update manifest.json with production URLs
# Zip the directory for distribution
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and support:

1. Check the troubleshooting section
2. Create an issue on GitHub
3. Contact the development team