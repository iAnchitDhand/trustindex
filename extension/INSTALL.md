# TrustIndex Browser Extension - Installation Guide

## Theme-Perfect Design

The TrustIndex browser extension now features the **exact same theme** as the web application:

### Visual Consistency
- **Same Dark Theme**: Identical color palette and design system
- **Matching Fonts**: DM Serif Display, DM Mono, and Instrument Sans
- **Grain Overlay**: Same subtle texture effect
- **SVG Score Circles**: Animated progress indicators matching web app
- **Responsive Design**: Adapts to different screen sizes

## Installation

### Method 1: Developer Mode (Recommended)

1. **Open Chrome** and navigate to `chrome://extensions/`
2. **Enable Developer Mode** (toggle in top-right corner)
3. **Click "Load unpacked"** 
4. **Select the `browser-extension` folder** from the TrustIndex project
5. **TrustIndex badge** will appear on websites you visit

### Method 2: Production Build

1. **Zip the `browser-extension` folder**
2. **Upload to Chrome Web Store** (requires developer account)
3. **Users can install** from the Chrome Web Store

## Features

### Trust Badge
- **Floating Badge**: Appears in top-right corner of every website
- **Live Scores**: Shows unique privacy scores for each domain
- **Click to Expand**: Detailed privacy analysis modal
- **Smooth Animations**: SVG-based score circles with transitions

### Popup Interface
- **Extension Icon**: Click toolbar icon for quick access
- **Current Site Analysis**: Shows score for active tab
- **Settings Panel**: Configure Claude API key
- **Quick Actions**: Analyze other sites or view full reports

### Detailed Modal
- **Comprehensive Reports**: All 5 privacy dimensions
- **Visual Progress Bars**: Animated score indicators
- **Company Information**: Real company names and verdicts
- **Responsive Design**: Works on all screen sizes

## Configuration

### API Key Setup
1. **Click the TrustIndex icon** in Chrome toolbar
2. **Enter your Claude API key** in the settings section
3. **Click "Save Settings"**

### Customization Options
- **Badge Position**: Can be adjusted in CSS
- **Color Scheme**: Uses CSS variables for easy theming
- **Animation Speed**: Configurable transition durations

## Technical Details

### Files Structure
```
browser-extension/
  manifest.json          # Extension configuration
  content.js            # Trust badge content script
  background.js         # Background service worker  
  popup.html           # Extension popup UI
  popup.js             # Popup logic
  styles.css           # Global styles
```

### Theme Integration
- **CSS Variables**: Same design tokens as web app
- **Font Loading**: Google Fonts integration
- **Grain Effect**: SVG-based texture overlay
- **Responsive Breakpoints**: Mobile-friendly design

### Performance
- **Lazy Loading**: Badge appears after page load
- **Smart Caching**: Results cached for 30 minutes
- **Minimal Impact**: Lightweight scripts and styles
- **Background Processing**: Non-blocking analysis

## Troubleshooting

### Badge Not Appearing
1. **Check extension is enabled** in `chrome://extensions/`
2. **Refresh the webpage** after installation
3. **Check browser console** for errors
4. **Verify permissions** for active tab

### API Issues
1. **Verify Claude API key** is valid
2. **Check network connectivity**
3. **Clear extension cache** and reload
4. **Try a different domain** to test

### Performance Problems
1. **Disable on specific sites** if needed
2. **Clear browser cache** regularly
3. **Check for conflicting extensions**
4. **Report issues** on GitHub

## Privacy & Security

- **No Personal Data**: Only domain names are analyzed
- **Local Storage**: API keys stored securely in Chrome
- **HTTPS Required**: All API calls use secure connections
- **Minimal Permissions**: Only needs active tab access

## Updates

The extension automatically updates when:
- **New version published** to Chrome Web Store
- **Developer reloads** unpacked extension
- **Browser restarts** with updated files

## Support

For issues and feature requests:
1. **Check troubleshooting section**
2. **Report bugs on GitHub**
3. **Contact development team**
4. **Join community discussions**

---

**The TrustIndex browser extension now provides a seamless, theme-consistent privacy intelligence experience across all websites.**