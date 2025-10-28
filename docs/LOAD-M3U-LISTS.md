# 📥 Load M3U/M3U8 Playlists

This feature allows you to load M3U/M3U8 channel playlists from multiple sources directly in the web application.

## 🌟 Features

- **Load from URL**: Import M3U/M3U8 playlists from any web URL
- **Load from Local File**: Upload M3U/M3U8 files from your computer
- **Load from Repository**: Quick access to playlists stored in the `data/` directory

## 📖 How to Use

### 1. Open the Load Modal

Click the **"📥 Load M3U Playlist"** button in the controls bar.

### 2. Select Loading Source

The modal has 3 tabs:

#### 🌐 From URL

1. Enter the M3U/M3U8 playlist URL
   - Example: `https://example.com/channels.m3u8`
2. (Optional) Specify a default category
   - If channels in the playlist don't have a category, this one will be assigned
3. Click **"⬇️ Load from URL"**

**Note**: The URL must allow CORS to be loaded from the browser.

#### 📁 Local File

1. Click on the file selection area
2. Select a `.m3u` or `.m3u8` file from your computer
3. (Optional) Specify a default category
4. Click **"⬇️ Load from file"**

#### 📂 Repository

1. Select one of the available playlists from the repository:
   - `canales-tv.m3u8` - Live TV
   - `listam3u8.m3u8` - Main playlist
   - `canales.m3u` - General channels
   - `mascanales.m3u` - Additional channels
2. Click **"⬇️ Load selected playlist"**

## 📝 M3U/M3U8 File Format

The application can parse M3U/M3U8 files with the following format:

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="" tvg-name="Channel Name" tvg-logo="logo.png" group-title="Category",Channel Name
https://example.com/stream.m3u8
```

### Required Fields

- **Channel Name**: After the comma in the `#EXTINF` line
- **URL**: The line following `#EXTINF`

### Optional Fields

- `group-title`: Channel category
- `tvg-logo`: Channel logo URL
- `tvg-name`: Alternative channel name
- `tvg-id`: Channel identifier

## 🔄 Channel Merging

When you load a new playlist:

1. **New channels** are added to the existing list
2. **Duplicate channels** (same name or URL) are NOT added
3. The channel counter is automatically updated
4. Channels are organized by categories

## ⚠️ Common Issues

### CORS Error

If you get a CORS error when loading from URL:

- ✅ **Solution 1**: Use the "Local File" option instead
- ✅ **Solution 2**: Use a CORS proxy
- ✅ **Solution 3**: Host the playlist on a server with CORS enabled

Example error:
```
Error loading playlist from URL: Network error or CORS restriction
```

### Invalid Format

If the file format is not recognized:

- ✅ Verify the file starts with `#EXTM3U`
- ✅ Check that each channel has an `#EXTINF` line
- ✅ Ensure URLs are valid and accessible

### Empty Playlist

If no channels are loaded:

- ✅ Verify the file is not empty
- ✅ Check that URLs are in M3U8/HLS format
- ✅ Ensure the file encoding is UTF-8

## 💡 Tips

1. **Test URLs**: Make sure URLs are accessible before loading
2. **Categories**: Assign a default category to organize uncategorized channels
3. **Backups**: Save your playlists locally as backup
4. **Performance**: Large playlists (1000+ channels) may take a few seconds to load

## 🔐 Privacy

- Playlists loaded from URL are NOT sent to any server
- All processing is done locally in your browser
- Your playlists are NOT stored or shared

## 📱 Mobile Support

The load feature works on mobile devices:

- ✅ Load from URL
- ✅ Load from local file (via file picker)
- ✅ Load from repository

## 🌍 Compatible Formats

- ✅ `.m3u` - Standard M3U playlist
- ✅ `.m3u8` - HLS playlist (HTTP Live Streaming)
- ✅ Plain text with M3U format
- ✅ UTF-8, UTF-16, Latin-1 encodings

## 📚 Examples

### Example 1: Load from Public URL

```
URL: https://iptv-org.github.io/iptv/countries/us.m3u
Category: International
```

### Example 2: Load from Local File

```
File: my-channels.m3u8
Category: Custom
```

### Example 3: Load from Repository

```
Playlist: canales-tv.m3u8
(No category needed - channels already have categories)
```

## 🆘 Support

If you encounter issues:

1. Check the browser console for detailed errors (F12)
2. Verify the playlist format is correct
3. Test the URL in a browser first
4. Report issues on [GitHub Issues](https://github.com/Kl4rkx/free-iptv-player/issues)

---

**Note**: This project does NOT provide pirated playlists. Use only legal sources that you have rights to access.
