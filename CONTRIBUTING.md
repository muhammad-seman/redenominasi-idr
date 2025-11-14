# Contributing to redenominasi-idr

Thank you for your interest in contributing to redenominasi-idr!

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/muhammad-seman/redenominasi-idr.git
cd redenominasi-idr
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Build the project:
```bash
npm run build
```

## Project Structure

```
redenominasi-idr/
├── src/
│   ├── core/           # Core conversion and formatting logic
│   ├── frameworks/     # Framework-specific wrappers
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── tests/              # Unit tests
├── examples/           # Usage examples
└── dist/               # Build output
```

## Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Keep functions pure when possible

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain test coverage above 80%

### Commits

- Use clear, descriptive commit messages
- Follow conventional commits format
- Keep commits focused and atomic

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Build: `npm run build`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Questions?

Feel free to open an issue for any questions or suggestions!
