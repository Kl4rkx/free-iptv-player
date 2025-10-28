# 📺 IPTV App Configuration for TV

## 🎯 Optimized Playlist

A **professional M3U8 playlist** has been generated specifically optimized for IPTV apps:

**File:** `data/canales-tv.m3u8`

### ✨ Features:

✅ **11,669 live TV channels**  
✅ **NO adult content** (144 channels filtered)  
✅ **Organized categories** with `group-title`  
✅ **Logos included** with `tvg-logo`  
✅ **EPG ID** ready for program guides  
✅ **Extended M3U8 standard format**  
✅ **Compatible with ALL IPTV apps**  

---

## 📱 Recommended IPTV Apps

### **1. IPTV Smarters Pro** ⭐ (The Best)

**Available on:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android mobile
- iOS (App Store)

**Features:**
- ✅ Modern and fast interface
- ✅ EPG (electronic program guide)
- ✅ Favorites and recording
- ✅ Parental control with PIN
- ✅ Optimized player

### **2. TiviMate** ⭐ (Premium but Excellent)

**Available on:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android mobile

**Features:**
- ✅ Best interface of all
- ✅ Advanced EPG with timeline
- ✅ PVR (scheduled recording)
- ✅ Multiple playlists
- ⚠️ Requires premium subscription ($5/year)

### **3. Perfect Player**

**Available on:**
- Android TV / Xiaomi TV
- Fire TV Stick
- Android mobile

**Features:**
- ✅ Free and ad-free
- ✅ Highly customizable
- ✅ EPG compatible
- ✅ Light and fast

### **4. Kodi + PVR IPTV Simple Client**

**Available on:**
- Windows, Mac, Linux
- Android TV / Fire TV
- Raspberry Pi

**Features:**
- ✅ Complete media suite
- ✅ Highly customizable
- ✅ Infinite add-ons
- ⚠️ More complex to configure

---

## 🔧 Step-by-Step Configuration

### Method 1: IPTV Smarters Pro

#### Step 1: Install the App
1. Open Google Play Store on your TV
2. Search for "IPTV Smarters Pro"
3. Install the app

#### Step 2: Add Playlist
1. Open IPTV Smarters Pro
2. Select **"Add New User"**
3. Choose **"Load Your Playlist or File/URL"**
4. Select **"M3U URL"**

#### Step 3: Enter Configuration
```
Playlist Name: Free IPTV Player
Playlist URL: https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
```

5. Click **"Add User"**
6. Done! The channels will load automatically

---

### Method 2: TiviMate

#### Step 1: Install
1. Download TiviMate from Google Play Store
2. Open the app

#### Step 2: Add Playlist
1. Go to **Settings** ⚙️
2. Select **"Playlists"**
3. Click **"Add Playlist"**
4. Choose **"URL"**

#### Step 3: Configuration
```
Name: Free IPTV Player
URL: https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
```

5. Click **"Next"**
6. Click **"Done"**

---

### Method 3: Perfect Player

#### Step 1: Install
1. Download Perfect Player from Play Store
2. Open the app

#### Step 2: Add Playlist
1. Press the **Menu** button (☰)
2. Go to **"Settings"**
3. Select **"General"**
4. Click **"Playlist (1)"**

#### Step 3: Configuration
```
Name: Free IPTV
URL: https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
```

5. Click **"OK"**
6. Return to main menu and channels will appear

---

### Method 4: Kodi + PVR IPTV Simple Client

#### Step 1: Install Kodi
- Download from kodi.tv

#### Step 2: Enable PVR IPTV Simple Client
1. Go to **Settings** → **Add-ons**
2. Select **"My add-ons"**
3. Go to **"PVR clients"**
4. Enable **"PVR IPTV Simple Client"**

#### Step 3: Configure
1. Click **"Configure"**
2. Select **"General"**
3. In **"M3U Play List URL"** enter:
```
https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
```

4. Click **"OK"**
5. Restart Kodi

---

## 📡 Direct Access URL

Use this URL in any IPTV app:

```
https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
```

**Alternative (if the previous doesn't work):**

```
https://raw.githubusercontent.com/Kl4rkx/free-iptv-player/main/data/canales-tv.m3u8
```

---

## 🔍 Verification

To verify the playlist is working:

1. **Open in browser:**
   ```
   https://kl4rkx.github.io/free-iptv-player/data/canales-tv.m3u8
   ```

2. You should see text starting with:
   ```
   #EXTM3U
   #EXTINF:-1 tvg-id=""...
   ```

---

## ⚙️ Additional Settings

### Enable EPG (Electronic Program Guide)

Some apps support EPG (TV guide). You can add:

```
EPG URL: (Not configured yet - coming soon)
```

### Configure Parental Control

In apps like IPTV Smarters Pro:

1. Go to **Settings** → **Parental Control**
2. Enable **"Parental Control"**
3. Set a **PIN code**
4. Select categories to protect

---

## 📱 Configuration on Xiaomi TV

### Using Built-in Browser

Xiaomi TV doesn't have a native app store, so:

#### Option 1: Install Google Play Store
1. Enable **"Unknown Sources"** in Settings
2. Download Google Play Store APK
3. Install using USB or ADB
4. Follow steps for Android TV

#### Option 2: Use Third-Party App Store
- APKPure TV
- Aptoide TV
- Install any IPTV app from there

#### Option 3: Direct APK Installation
1. Download IPTV Smarters Pro APK to USB
2. Insert USB into TV
3. Install using file manager
4. Configure as explained above

---

## 🚀 Optimization Tips

### For Better Performance:

1. **Stable Internet Connection**
   - Minimum: 10 Mbps for HD
   - Recommended: 25+ Mbps for UHD

2. **Wired Connection**
   - Use Ethernet cable instead of WiFi if possible

3. **Router Configuration**
   - Enable QoS (Quality of Service)
   - Prioritize TV streaming traffic

4. **Buffer Settings**
   - In apps, increase buffer size to 10-20 seconds
   - Reduces interruptions

---

## ❓ Common Issues

### Channels Don't Load

✅ **Solutions:**
1. Verify internet connection
2. Check the playlist URL is correct
3. Try the alternative GitHub URL
4. Restart the app
5. Clear app cache

### Channels Buffer/Freeze

✅ **Solutions:**
1. Check internet speed (speedtest.net)
2. Use wired connection
3. Increase buffer in app settings
4. Close other apps using bandwidth
5. Try changing DNS to 8.8.8.8 (Google)

### No Image, Only Audio

✅ **Solutions:**
1. Update the IPTV app
2. Try a different player in app settings
3. Check TV codec support

### App Crashes

✅ **Solutions:**
1. Update to latest version
2. Clear app cache and data
3. Reinstall the app
4. Try a different IPTV app

---

## 🌐 Multi-Device Access

You can use the **same playlist** on:

- ✅ Smart TV (Android TV, Fire TV)
- ✅ Smartphone (Android/iOS)
- ✅ Tablet
- ✅ PC (Windows/Mac/Linux with Kodi or VLC)
- ✅ Chromecast (via compatible app)

---

## 🔐 Privacy & Security

- ✅ All streams come from public sources
- ✅ No registration or personal data required
- ✅ Playlist is hosted on GitHub (secure and fast)
- ⚠️ Use only legal streams you have rights to access

---

## 📞 Support

If you need help:

1. Check this guide first
2. Search in [GitHub Issues](https://github.com/Kl4rkx/free-iptv-player/issues)
3. Report problems with detailed information

---

## ⚖️ Legal Disclaimer

**IMPORTANT:**

- ✅ This project provides technology for streaming
- ✅ Demo playlist includes only legal content
- ❌ We do NOT provide pirated streams
- ❌ We do NOT support illegal use
- ⚠️ Users are responsible for their content sources

**Comply with the laws of your country.**

---

**Enjoy your IPTV experience! 📺🎉**
