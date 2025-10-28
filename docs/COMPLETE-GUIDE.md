# 📺 Free IPTV Player - Complete Guide

## 🎯 Project Overview

Modern web streaming platform featuring HLS/M3U8 playback technology. Play live streams directly in your browser using HLS.js.

## 📊 Statistics

- **Demo Channels**: 1 legal channel
- **Categories**: Customizable
- **Supported Formats**: M3U8, HLS, M3U
- **Compatibility**: Chrome, Firefox, Edge, Safari, mobile devices
- **Technology**: ES6 Modules, HLS.js, PWA

## 🗂️ Project Structure

```
free-iptv-player/
├── index.html              # Main application (Spanish)
├── index-en.html           # Main application (English)
├── README.md               # Project documentation (English)
├── README.es.md            # Project documentation (Spanish)
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
├── SECURITY.md             # Security policy
├── _config.yml             # GitHub Pages configuration
├── .nojekyll               # GitHub Pages static files
├── .gitignore              # Git ignored files
│
├── data/                   # Channel data
│   ├── canales-demo.js     # Demo channels (100% legal)
│   ├── canales.js          # Personal channels (excluded from repo)
│   ├── README.md           # Data directory documentation
│   └── README-LEGAL.md     # Legal information
│
├── docs/                   # Documentation
│   ├── CHANGELOG.md        # Version history
│   ├── CODE_OF_CONDUCT.md  # Code of conduct
│   ├── CONTRIBUTORS.md     # Contributors list
│   ├── GUIA_COMPLETA.md    # Complete guide (Spanish)
│   ├── COMPLETE-GUIDE.md   # Complete guide (English)
│   ├── CONFIGURACION-IPTV.md        # IPTV config (Spanish)
│   ├── IPTV-APP-CONFIGURATION.md    # IPTV config (English)
│   ├── CARGAR-LISTAS-M3U.md         # Load playlists (Spanish)
│   ├── LOAD-M3U-LISTS.md            # Load playlists (English)
│   └── README.md           # Documentation index
│
├── src/                    # Source code
│   ├── js/                 # JavaScript modules
│   │   ├── app.js          # Main application controller
│   │   ├── player.js       # Video player (HLS.js wrapper)
│   │   ├── playlist-loader.js  # Playlist loading module
│   │   └── m3u-parser.js   # M3U/M3U8 parser
│   └── css/                # Stylesheets
│       ├── styles.css      # Main styles
│       └── modal.css       # Modal styles
│
├── public/                 # Public assets
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service Worker
│   └── robots.txt          # SEO configuration
│
└── assets/                 # Static assets
    └── icons/              # App icons
        └── favicon.svg     # Favicon
```

## 📋 Available Categories

| Category | Emoji | Description |
|----------|-------|-------------|
| Sports | ⚽ | Sports channels |
| Movies | 🎬 | Movie channels |
| Series | 📺 | TV series and shows |
| Documentaries | 🌍 | Documentary channels |
| Kids | 👶 | Children's content |
| News | 📰 | News channels |
| Music | 🎵 | Music channels |
| Entertainment | 🎭 | Variety and entertainment |
| Educational | 📚 | Educational content |
| Religious | ✝️ | Religious programming |
| International | 🌍 | International channels |
| Demo | 🧪 | Demo and test channels |

## 🚀 How to Use

### Online (GitHub Pages)

Simply visit:
```
https://kl4rkx.github.io/free-iptv-player
```

### Local Development

#### Option 1: Python HTTP Server
```bash
cd free-iptv-player
python -m http.server 8000
# Open: http://localhost:8000
```

#### Option 2: Node.js (npx serve)
```bash
cd free-iptv-player
npx serve
# Open: http://localhost:3000
```

#### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 Features

### ✅ Current Features

- **M3U8 Playback**: Direct HLS streaming in browser
- **Real-Time Search**: Instant filtering by name
- **Category Organization**: Organized by categories with counters
- **Expand/Collapse**: Expand or collapse all categories at once
- **Parental Control**: PIN-protected categories (configurable)
- **Load Playlists**: Import M3U/M3U8 from URL, file, or repository
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern dark interface with glassmorphism
- **PWA**: Install as app on any device
- **Offline Support**: Service Worker for offline access
- **Bilingual**: English and Spanish support
- **No Ads**: Clean, distraction-free experience

### 🎬 Video Player

- **HLS.js Integration**: Native HLS support
- **Adaptive Quality**: Automatic quality adjustment
- **Full Controls**: Play, pause, volume, fullscreen
- **Modal View**: Dedicated player modal
- **Loading Indicator**: Visual feedback during loading
- **Error Handling**: Graceful error messages

### 🔍 Search & Filter

- **Real-Time Search**: Filter as you type
- **Case-Insensitive**: Finds channels regardless of case
- **Multiple Keywords**: Search by name, logo, or category
- **Visual Feedback**: Highlights matching channels
- **Fast Performance**: Instant results even with thousands of channels

### 📥 Playlist Loading

#### Load from URL
```
https://example.com/playlist.m3u8
```

#### Load from Local File
- Drag & drop support
- File picker
- Supports .m3u and .m3u8 formats

#### Load from Repository
- Pre-configured playlists
- One-click loading
- Automatic merging with existing channels

### 🔒 Parental Control

Default PIN: `1234`

Protected categories:
- Adult content
- Custom categories (configurable)

Features:
- PIN entry modal
- Session-based unlock
- Visual locked/unlocked indicators

### 📱 PWA Features

- **Installable**: Add to home screen
- **Offline Capable**: Works without internet (for UI)
- **App-Like Experience**: Full-screen, no browser UI
- **Fast Loading**: Cached assets for instant load

## ⚙️ Configuration

### Add Your Own Channels

1. Create `data/canales.js`:
```javascript
const CANALES_STREAMING = [
    { 
        name: "Channel Name", 
        logo: "🎬", 
        url: "https://example.com/stream.m3u8", 
        category: "Movies" 
    }
];
```

2. The file is excluded from Git (privacy)

### Customize Categories

Edit `src/js/app.js`:
```javascript
this.categoryIcons = {
    "Sports": "⚽",
    "Movies": "🎬",
    "Custom": "🎯"
};

this.categoryNames = {
    "Sports": "⚽ Sports",
    "Movies": "🎬 Movies",
    "Custom": "🎯 Custom Category"
};
```

### Change Parental Control PIN

Edit `src/js/app.js`:
```javascript
checkParentalPin(category) {
    const correctPin = "1234"; // Change this
    // ...
}
```

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling, animations, glassmorphism
- **JavaScript (ES6+)**: Modules, classes, async/await
- **HLS.js**: HLS playback library
- **Service Worker**: Offline support and caching

### Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Mobile Chrome | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |

### Performance

- **First Load**: < 2s (with demo channel)
- **Search**: < 50ms for 10,000+ channels
- **Category Render**: < 100ms
- **Player Start**: < 1s (depends on stream)

## 📖 API Documentation

### App Class

Main application controller

```javascript
class App {
    constructor()           // Initialize application
    init()                  // Setup UI and event listeners
    renderChannels()        // Render channel list
    playChannel(channel)    // Play selected channel
    searchChannels(query)   // Filter channels by query
    // ... more methods
}
```

### VideoPlayer Class

HLS video player wrapper

```javascript
class VideoPlayer {
    constructor(videoElement, modalElement, loadingElement)
    loadStream(url, channelName)  // Load and play stream
    destroy()                      // Clean up resources
}
```

### PlaylistLoader Class

Loads playlists from multiple sources

```javascript
class PlaylistLoader {
    loadFromURL(url, defaultCategory)     // Load from URL
    loadFromFile(file, defaultCategory)   // Load from file
    loadFromRepo(filename)                // Load from repository
}
```

### M3UParser Class

Parse M3U/M3U8 files

```javascript
class M3UParser {
    static parse(content, defaultCategory)  // Parse M3U content
    static isValid(content)                 // Validate M3U format
}
```

## 🔐 Security & Privacy

### Privacy
- ✅ No tracking or analytics
- ✅ No data sent to external servers
- ✅ Personal playlists stay private (excluded from Git)
- ✅ All processing done locally in browser

### Security
- ✅ HTTPS on GitHub Pages
- ✅ CSP headers configured
- ✅ No inline scripts (ES6 modules)
- ✅ Service Worker with security best practices

### Legal
- ✅ Demo includes only legal, Creative Commons content
- ✅ No pirated streams provided
- ✅ Users responsible for their own content sources
- ⚠️ Comply with laws in your country

## 🌍 Internationalization

### Supported Languages

- 🇬🇧 **English** (default) - `index-en.html`
- 🇪🇸 **Spanish** - `index.html`

### Add New Language

1. Copy `index.html` to `index-[lang].html`
2. Translate UI text
3. Update language switcher links
4. Create `README.[lang].md`

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Quick Start

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](../LICENSE) for details

## 🆘 Troubleshooting

### Channels Won't Play

**Issue**: Channel loads but doesn't play

**Solutions**:
1. Check if URL is valid (test in browser)
2. Verify URL is M3U8/HLS format
3. Check browser console for errors (F12)
4. Try different browser
5. Check CORS restrictions

### Loading Screen Stuck

**Issue**: App stays on loading screen

**Solutions**:
1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check browser console for errors
4. Verify `canales-demo.js` file exists
5. Check internet connection

### Search Not Working

**Issue**: Search doesn't filter channels

**Solutions**:
1. Check if channels have loaded (check counter)
2. Try exact channel name
3. Clear search and try again
4. Reload page

### PWA Won't Install

**Issue**: "Install App" doesn't appear

**Solutions**:
1. Use supported browser (Chrome, Edge, Samsung Internet)
2. Verify HTTPS connection (required)
3. Check manifest.json is accessible
4. Clear browser data and try again

## 📚 Additional Resources

- [Official HLS.js Documentation](https://github.com/video-dev/hls.js/)
- [MDN Web Docs - Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)
- [M3U Format Specification](https://en.wikipedia.org/wiki/M3U)

## 📞 Support

- 📧 Email: [Create issue on GitHub]
- 🐛 Bug Reports: [GitHub Issues](https://github.com/Kl4rkx/free-iptv-player/issues)
- 💡 Feature Requests: [GitHub Issues](https://github.com/Kl4rkx/free-iptv-player/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/Kl4rkx/free-iptv-player/wiki)

---

**Made with ❤️ for the open source community**
