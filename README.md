# Quantum Flow Holdings

A professional, modern automated trading dashboard built with HTML5, Bootstrap, and TradingView integration.

## 📁 Project Structure

```
Quantum-FlowHoldings/
├── index.html              # Main application entry point
├── assets/
│   ├── css/
│   │   └── styles.css     # Professional dark theme stylesheet
│   └── js/
│       └── app.js         # Application logic and state management
└── README.md              # Documentation
```

## ✨ Features

### Dashboard Components
- **Real-Time Ticker Tape** - Live market data feeds
  - Gold / USD (XAUUSD)
  - Bitcoin / USD (BTCUSD)
  - USD / ZAR (USDZAR)

- **Interactive Chart** - 15-minute XAUUSD chart (TradingView)
  - Dark theme with professional styling
  - Full responsive support
  - Adaptive toolbar

- **Quantum Flow Core Panel** - Advanced control system
  - 📊 Market Sentiment Indicator (0-100%)
  - ⚡ Bot Latency Monitor (milliseconds)
  - 🤖 Active Bots Counter
  - ⏰ Last Update Timestamp
  - 🚨 Emergency Stop Button (with confirmation)
  - 📄 View Client Invoices

### Technical Features
- 🎨 **Dark Professional Theme** - Cyan accents (#00f2ff)
- 📱 **Fully Responsive** - Desktop, Tablet, Mobile
- ♿ **Accessible** - WCAG 2.1 AA compliant, ARIA labels
- ⚡ **Optimized** - Fast load times, smooth animations
- 🔧 **Maintainable** - Clean code, JSDoc documentation
- 🛡️ **Robust** - Error handling, validation, confirmation dialogs

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for TradingView widgets)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/sibanda621-gif/Quantum-FlowHoldings.git
   cd Quantum-FlowHoldings
   ```

2. Open in browser
   ```bash
   # Option 1: Direct open
   open index.html
   
   # Option 2: Local server (Python)
   python -m http.server 8000
   
   # Option 3: Local server (Node.js)
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## ⚙️ Configuration

### Chart Symbol Configuration
Edit `assets/js/app.js`:

```javascript
const CONFIG = {
    updateInterval: 5000,      // Metric update frequency (ms)
    timezone: 'Africa/Johannesburg',
    chart: {
        symbol: 'OANDA:XAUUSD', // Change trading symbol
        interval: '15',         // 15-minute chart
        theme: 'dark',
        style: '1',             // Chart style (1-3)
    }
};
```

### Ticker Symbols
Edit `index.html` (ticker section) to customize symbols:

```javascript
"symbols": [
    {"proName": "FX_IDC:XAUUSD", "title": "Gold / USD"},
    {"proName": "BITSTAMP:BTCUSD", "title": "Bitcoin / USD"},
    {"proName": "FX:USDZAR", "title": "USD / ZAR"}
]
```

## 🎯 API Integration

### Connecting Real Data

Replace simulated data with API calls in `assets/js/app.js`:

```javascript
// Example: Fetch metrics from backend
async function fetchMetrics() {
    try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        
        updateSentiment(data.sentiment);
        updateLatency(data.latency);
        updateActiveBots(data.activeBots);
    } catch (error) {
        console.error('API Error:', error);
    }
}

// Update initialization
setInterval(fetchMetrics, CONFIG.updateInterval);
```

### Backend API Format

Expected JSON response:
```json
{
    "sentiment": 65,
    "latency": 14,
    "activeBots": 3,
    "timestamp": "2026-05-14T09:23:00Z"
}
```

## 🎨 Customization

### Color Theme
Edit CSS variables in `assets/css/styles.css`:

```css
:root {
    --cyan: #00f2ff;           /* Primary accent */
    --dark-bg: #131722;        /* Background */
    --success: #26a69a;        /* Success color */
    --warning: #ffd700;        /* Warning color */
    --danger: #ff6b6b;         /* Danger/Error color */
}
```

### Font & Typography
- **Font Family**: System fonts (no external dependencies)
- **Font Sizes**: Responsive and accessible
- **Font Weight**: 400 (normal), 600 (semibold), 700 (bold)

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- ✓ Semantic HTML5 structure
- ✓ ARIA labels on interactive elements
- ✓ Proper color contrast ratios
- ✓ Keyboard navigation support
- ✓ Focus states on all interactive elements
- ✓ Screen reader friendly

### Keyboard Navigation
- `Tab` - Navigate between elements
- `Enter` - Activate buttons
- `Esc` - Cancel dialogs (when implemented)

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| **Desktop** | ≥1200px | Full 2-column layout |
| **Tablet** | 768-1199px | Adapted 2-column |
| **Mobile** | <768px | Stacked layout |
| **Small Phone** | <480px | Minimal layout |

## 🔐 Security Considerations

- Content Security Policy compatible
- No inline JavaScript (except critical initialization)
- XSS protection through proper HTML escaping
- CORS-ready for API integration
- No sensitive data stored locally

## 🐛 Troubleshooting

### TradingView Widgets Not Loading
**Problem**: Charts or ticker tape not displaying

**Solutions**:
1. Check internet connection
2. Verify script sources are accessible:
   - `https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js`
   - `https://s3.tradingview.com/tv.js`
3. Check browser console (F12 → Console) for errors
4. Disable browser extensions (ad blockers may interfere)

### Metrics Not Updating
**Problem**: Dashboard metrics (sentiment, latency) not changing

**Solutions**:
1. Check `CONFIG.updateInterval` in `assets/js/app.js`
2. Verify API endpoint if using real data
3. Open browser console for JavaScript errors
4. Check network tab (F12 → Network) for failed requests

### Styling Issues
**Problem**: Buttons or cards not styled correctly

**Solutions**:
1. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Verify `assets/css/styles.css` loads in Network tab
3. Check Font Awesome CDN is accessible
4. Try different browser

### Performance Issues
**Problem**: Dashboard is slow or laggy

**Solutions**:
1. Reduce `CONFIG.updateInterval` (higher = less frequent updates)
2. Disable browser extensions
3. Check available system RAM
4. Try different browser

## 📚 Resources

- [TradingView Widgets](https://www.tradingview.com/widget/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2026 Quantum Flow Holdings. All rights reserved.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the browser console (F12)
- Review code comments for implementation details

---

**Last Updated**: 2026-05-14  
**Version**: 2.0  
**Status**: Production Ready ✅
