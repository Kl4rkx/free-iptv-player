# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of M3U8 Streaming Player seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

Please send an email to the project maintainers describing:

1. **Type of issue** (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
2. **Full paths of source file(s)** related to the manifestation of the issue
3. **Location of the affected source code** (tag/branch/commit or direct URL)
4. **Step-by-step instructions to reproduce the issue**
5. **Proof-of-concept or exploit code** (if possible)
6. **Impact of the issue**, including how an attacker might exploit it

### What to Expect

- You should receive a response within **48 hours** acknowledging your report
- We will investigate and validate the security issue
- We will keep you informed about the progress toward a fix
- Once the vulnerability is confirmed, we will:
  - Work on a fix and release schedule
  - Create a security advisory
  - Credit you for the discovery (unless you prefer to remain anonymous)

## Security Best Practices

### For Users

1. **Always use HTTPS** when loading playlists from external URLs
2. **Verify playlist sources** before loading them
3. **Enable parental controls** if accessing content with minors present
4. **Keep your browser updated** to the latest version
5. **Be cautious with unknown URLs** - only load playlists from trusted sources

### For Developers

1. **Sanitize all user inputs** before processing
2. **Validate URLs** before fetching content
3. **Use Content Security Policy (CSP)** headers when deploying
4. **Implement rate limiting** for external URL requests
5. **Keep dependencies updated** (especially HLS.js)
6. **Never expose sensitive tokens** or API keys in client-side code

## Known Security Considerations

### Content Security

This application loads and plays external video streams. Users should be aware that:

- Stream content is provided by third-party sources
- We do not control or verify the content of external streams
- Users are responsible for ensuring they have proper authorization to access streams
- Parental controls are available but should not be solely relied upon

### XSS Protection

The application implements several XSS protections:

- Input sanitization for URLs and file names
- Content Security Policy (CSP) ready
- No use of `eval()` or `innerHTML` with user content
- Safe DOM manipulation using `textContent` instead of `innerHTML`

### CORS and External Resources

- HLS.js is loaded from CDN (jsDelivr) with SRI hash for integrity verification
- External playlists may have CORS restrictions
- Local file loading requires user interaction (file picker)

## Dependency Security

We regularly monitor our dependencies for security vulnerabilities:

- **HLS.js**: Video streaming library (Apache 2.0 License)
  - Version: 1.5.x or higher
  - Automatic updates for security patches
  - Known vulnerabilities tracked via GitHub Security Advisories

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue to discuss.

## Hall of Fame

We thank the following security researchers for responsibly disclosing vulnerabilities:

*(No vulnerabilities have been reported yet)*

---

**Last Updated**: 2024

Thank you for helping keep M3U8 Streaming Player and our users safe!
