# Contributing to M3U8 Streaming Platform

First off, thank you for considering contributing to M3U8 Streaming Platform! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** of differing viewpoints and experiences
- **Accept constructive criticism** gracefully
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title** and description
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- **Clear title** and detailed description
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit** with conventional commits
6. **Push** to your fork
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Git
- Modern web browser
- Python 3 or Node.js (for local server)
- Code editor (VS Code recommended)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/m3u8hosting.git
cd m3u8hosting

# Create a new branch
git checkout -b feature/my-new-feature

# Start development server
python -m http.server 8080
# Or with Node.js
npx http-server -p 8080

# Open in browser
open http://localhost:8080
```

### Project Structure

```
m3u8hosting/
├── src/
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript modules
├── data/             # Channel data (private)
├── public/           # Public assets
├── docs/             # Documentation
└── assets/           # Static resources
```

## Pull Request Process

1. **Update documentation** if you change functionality
2. **Add tests** if applicable
3. **Follow style guidelines** (see below)
4. **Update CHANGELOG.md** with your changes
5. **Ensure all tests pass**
6. **Request review** from maintainers

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console warnings or errors
- [ ] Works on mobile and desktop
- [ ] Tested on multiple browsers

## Style Guidelines

### JavaScript

- **ES6+** syntax
- **Modular** structure
- **CamelCase** for variables and functions
- **PascalCase** for classes
- **JSDoc** comments for functions
- **Async/await** instead of promises chains

Example:
```javascript
/**
 * Loads playlist from URL
 * @param {string} url - Playlist URL
 * @returns {Promise<Object>} Loaded channels
 */
async loadFromURL(url) {
    // Implementation
}
```

### CSS

- **Mobile-first** approach
- **BEM naming** convention
- **Logical grouping** of properties
- **Comments** for complex sections

Example:
```css
/* Channel Card Component */
.channel-card {
    /* Layout */
    display: flex;
    
    /* Appearance */
    background: rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    
    /* Animation */
    transition: all 0.3s ease;
}
```

### HTML

- **Semantic** tags
- **ARIA labels** for accessibility
- **Descriptive** class names
- **No inline styles** (use CSS)

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(player): add picture-in-picture support

Add PiP functionality for video player with browser API fallback.

Closes #123
```

```bash
fix(parser): handle malformed M3U8 files

Improve error handling for invalid M3U8 format.
Add validation before parsing.

Fixes #456
```

## Testing

### Manual Testing

Before submitting:

1. **Test on multiple browsers**:
   - Chrome/Edge (latest)
   - Firefox (latest)
   - Safari (latest)
   - Mobile browsers

2. **Test features**:
   - Channel playback
   - Search functionality
   - Category collapse/expand
   - Playlist loading
   - Parental control
   - Responsive design

3. **Check console**:
   - No errors
   - No warnings
   - No deprecated API usage

### Automated Testing (Future)

We plan to add:
- Unit tests (Jest)
- E2E tests (Playwright)
- Accessibility tests (axe)

## Documentation

### Code Documentation

- Add JSDoc comments to all functions
- Document complex algorithms
- Explain "why" not just "what"

### User Documentation

- Update README.md for new features
- Add examples for new functionality
- Keep language simple and clear
- Provide both English and Spanish versions

## Questions?

Feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Contact maintainers

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in commit history

---

Thank you for contributing! 🚀

**Happy Coding!** ❤️
