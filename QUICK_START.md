# Quick Start: Publishing to npm

Follow these steps to publish `redenominasi-idr` to npm:

## Step 1: Create npm Account

If you don't have an npm account:
1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

## Step 2: Login to npm

Open terminal in the project directory and login:

```bash
cd /Users/macbook/Documents/PROJECT/PACKAGE/redenominasi-idr
npm login
```

Enter your npm credentials:
- Username
- Password
- Email
- One-time password (if 2FA enabled)

Verify login:
```bash
npm whoami
```

## Step 3: Update Package Information

Edit `package.json` and update these fields:

```json
{
  "name": "redenominasi-idr",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/redenominasi-idr.git"
  }
}
```

**Important:** If the name `redenominasi-idr` is already taken, you have two options:

**Option A:** Choose a different name:
```json
{
  "name": "rupiah-redenomination"
}
```

**Option B:** Use scoped package (recommended):
```json
{
  "name": "@yourusername/redenominasi-idr"
}
```

## Step 4: Build the Package

Run the build command:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions (.d.ts files)
- Create both ESM and CJS bundles in `dist/` folder

Verify the build:
```bash
ls -la dist/
```

You should see:
- `index.js` (CommonJS)
- `index.esm.js` (ES Modules)
- `index.d.ts` (TypeScript types)
- `react/` (React wrapper)

## Step 5: Test the Package Locally (Optional)

Before publishing, test the package:

```bash
npm pack
```

This creates a `.tgz` file (e.g., `redenominasi-idr-1.0.0.tgz`).

Test in another project:
```bash
cd /path/to/test-project
npm install /Users/macbook/Documents/PROJECT/PACKAGE/redenominasi-idr/redenominasi-idr-1.0.0.tgz
```

## Step 6: Run Tests

Make sure all tests pass:

```bash
npm test
```

## Step 7: Publish to npm

### For Public Package

```bash
npm publish
```

### For Scoped Package

```bash
npm publish --access public
```

### For Beta/Alpha Release

```bash
npm publish --tag beta
```

## Step 8: Verify Publication

1. Check on npm: https://www.npmjs.com/package/redenominasi-idr
2. Test installation:

```bash
npm install redenominasi-idr
```

## Step 9: Update Version for Future Releases

When you want to publish updates:

```bash
# Bug fixes (1.0.0 → 1.0.1)
npm version patch

# New features (1.0.0 → 1.1.0)
npm version minor

# Breaking changes (1.0.0 → 2.0.0)
npm version major

# Then publish again
npm publish
```

## Common Issues & Solutions

### Issue: Package name already exists

**Solution:** Use scoped package:
```json
{
  "name": "@yourusername/redenominasi-idr"
}
```

Then publish with:
```bash
npm publish --access public
```

### Issue: 403 Forbidden

**Solution:** Make sure you're logged in:
```bash
npm whoami
npm login
```

### Issue: 402 Payment Required

**Solution:** You're trying to publish a scoped private package. Use:
```bash
npm publish --access public
```

### Issue: Build fails

**Solution:** Check if TypeScript and dependencies are installed:
```bash
npm install
npm run build
```

## Complete Command Sequence

Here's the complete sequence to publish:

```bash
# 1. Navigate to project
cd /Users/macbook/Documents/PROJECT/PACKAGE/redenominasi-idr

# 2. Login to npm
npm login

# 3. Install dependencies (already done)
npm install

# 4. Run tests
npm test

# 5. Build package
npm run build

# 6. Publish
npm publish

# For scoped package:
npm publish --access public
```

## After Publishing

Share your package:
- Add GitHub repository
- Create GitHub releases
- Update README with installation instructions
- Share on social media, forums, etc.

Users can install with:
```bash
npm install redenominasi-idr
```

Or:
```bash
yarn add redenominasi-idr
```

## Need Help?

- npm documentation: https://docs.npmjs.com/
- npm support: https://www.npmjs.com/support
- Check PUBLISH.md for detailed guide
