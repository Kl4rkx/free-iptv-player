# ❓ Technical FAQ (Frequently Asked Questions)

## 🔧 Stream Playback

### What technology does the web player use to play M3U8 streams?

The web player uses two different technologies depending on the browser:

1. **HLS.js (v1.4.14)** - For browsers like Chrome, Firefox, Edge
2. **Native HLS Support** - For Safari, iOS, and some mobile browsers

### What User Agent does the player use?

**The player does NOT use a custom User Agent.** It uses the native User Agent of the browser you're using.

Examples of User Agents by browser:

- **Chrome/Edge:** `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`
- **Firefox:** `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0`
- **Safari:** `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15`

### How does HLS.js work?

HLS.js is a JavaScript library that:
1. Downloads the M3U8 manifest using the browser's **Fetch API**
2. Parses the video segments
3. Downloads and decodes them in the browser
4. Plays them using the HTML5 `<video>` element

**Important:** All HTTP requests are made from the user's browser, using the browser's User Agent.

### What HTTP headers does the player use?

#### For loading M3U/M3U8 playlists (playlist-loader.js):
```javascript
{
  'Accept': 'application/x-mpegURL, application/vnd.apple.mpegurl, text/plain, */*'
}
```

#### For playing streams (HLS.js):
HLS.js uses the browser's default headers. No additional custom headers are configured.

---

## 🚫 403 Forbidden Error in Jellyfin/FFmpeg

### Why do I get a 403 error in Jellyfin but it works in the web player?

The 403 (Forbidden) error usually occurs because:

1. **Different User Agent:** FFmpeg/Jellyfin uses a different User Agent than browsers
2. **Server protection:** Some streaming servers block known User Agents like FFmpeg
3. **Missing headers:** FFmpeg may not send all the headers the server expects
4. **Referer:** Some servers require a specific Referer header

### How to fix the 403 error in Jellyfin/FFmpeg?

#### Option 1: Specify User Agent in FFmpeg
```bash
ffmpeg -user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -i "STREAM_URL.m3u8" ...
```

#### Option 2: Add additional headers
```bash
ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Referer: https://example.com/" -i "STREAM_URL.m3u8" ...
```

#### Option 3: Configure Jellyfin
In Jellyfin, you can configure the User Agent at:
1. `Dashboard` → `Playback`
2. Look for FFmpeg options
3. Add custom FFmpeg parameters

**Configuration example:**
```
-user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
```

### Can I use the same User Agent as the web player?

Yes, but **remember that the User Agent varies depending on which browser you use**. We recommend:

1. **Chrome/Edge User Agent (most compatible):**
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   ```

2. **Firefox User Agent:**
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0
   ```

---

## 🔍 Debugging and Analysis

### How can I see what User Agent my browser is using?

1. Open the browser's **DevTools** (F12)
2. Go to the **Console** tab
3. Type: `navigator.userAgent`
4. Press Enter

### How can I see the HTTP requests made by the player?

1. Open **DevTools** (F12)
2. Go to the **Network** tab
3. Filter by `m3u8` or `ts` (video segments)
4. Play a channel
5. You'll see all HTTP requests with their headers

### How can I test if a stream works with FFmpeg?

```bash
# Test simple download
ffmpeg -i "STREAM_URL.m3u8" -t 10 -c copy test.mp4

# Test with custom User Agent
ffmpeg -user_agent "Mozilla/5.0" -i "STREAM_URL.m3u8" -t 10 -c copy test.mp4

# View stream information without downloading
ffprobe "STREAM_URL.m3u8"
```

---

## 📊 HLS.js Configuration in the Player

The player uses the following HLS.js configuration (see `src/js/player.js`):

```javascript
{
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90,
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
  manifestLoadingTimeOut: 10000,
  manifestLoadingMaxRetry: 3,
  levelLoadingTimeOut: 10000,
  levelLoadingMaxRetry: 4,
  fragLoadingTimeOut: 20000,
  fragLoadingMaxRetry: 6,
  // ... more configurations
}
```

This configuration is optimized for:
- ✅ Low latency
- ✅ Automatic error recovery
- ✅ Multiple retries
- ✅ Optimized buffer

---

## 🛠️ More Information

- **Player code:** `src/js/player.js`
- **Playlist loading:** `src/js/playlist-loader.js`
- **HLS.js Documentation:** https://github.com/video-dev/hls.js/
- **FFmpeg Documentation:** https://ffmpeg.org/documentation.html

---

## 📞 Need more help?

If you have more technical questions, please:
1. Review the source code in `/src/js/`
2. Check the HLS.js documentation
3. Open a GitHub issue with specific details

---

**Last updated:** 2025-11-09
