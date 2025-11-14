# Publishing Guide

This guide explains how to publish `redenominasi-idr` to npm.

## Prerequisites

1. **npm account**: Sign up at [npmjs.com](https://www.npmjs.com/)
2. **Login to npm**:
   ```bash
   npm login
   ```

## Pre-publish Checklist

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run tests**:
   ```bash
   npm test
   ```
   Ensure all tests pass with coverage > 80%.

3. **Build the package**:
   ```bash
   npm run build
   ```
   This will create the `dist/` folder with compiled code.

4. **Update version** in `package.json`:
   ```json
   {
     "version": "1.0.0"
   }
   ```
   Or use npm version commands:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

5. **Test locally** (optional):
   ```bash
   npm pack
   ```
   This creates a `.tgz` file you can test in another project:
   ```bash
   npm install /path/to/redenominasi-idr-1.0.0.tgz
   ```

## Publishing

### First Time Publishing

```bash
npm publish
```

### Subsequent Releases

1. Update version:
   ```bash
   npm version patch
   ```

2. Publish:
   ```bash
   npm publish
   ```

### Publishing with Tag

For beta/alpha releases:
```bash
npm publish --tag beta
npm publish --tag alpha
```

Users can install with:
```bash
npm install redenominasi-idr@beta
```

## Post-publish

1. **Verify on npm**: Visit https://www.npmjs.com/package/redenominasi-idr

2. **Test installation**:
   ```bash
   npm install redenominasi-idr
   ```

3. **Tag release on GitHub**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Common Issues

### Authentication Error
```bash
npm login
# Enter username, password, and email
```

### Permission Denied
Make sure you're logged in and have publishing rights:
```bash
npm whoami
```

### Package Name Taken
If the package name is already taken, update the `name` field in `package.json`:
```json
{
  "name": "@yourscope/redenominasi-idr"
}
```

For scoped packages, publish with:
```bash
npm publish --access public
```

## Automated Publishing (GitHub Actions)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to GitHub repository secrets.

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes (2.0.0)
- **MINOR**: New features, backward compatible (1.1.0)
- **PATCH**: Bug fixes (1.0.1)

## Changelog

Keep a `CHANGELOG.md` to track changes:

```markdown
# Changelog

## [1.0.0] - 2025-01-14
### Added
- Initial release
- Core conversion and formatting functions
- React hooks and components
- TypeScript support

## [1.0.1] - 2025-01-15
### Fixed
- Fixed rounding issue in decimal values
```

## Support

For issues or questions, open an issue on GitHub.
