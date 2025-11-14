# redenominasi-idr

Indonesian Rupiah redenomination library for conversion and formatting (1:1000 ratio). Framework-agnostic with built-in React support.

[![npm version](https://badge.fury.io/js/redenominasi-idr.svg)](https://www.npmjs.com/package/redenominasi-idr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Zero dependencies** - Lightweight and fast
- 📦 **Tree-shakeable** - Import only what you need
- 🎯 **TypeScript-first** - Full type safety
- ⚛️ **React support** - Hooks and components included
- 🌍 **SSR-safe** - Works with Next.js, Nuxt, etc.
- 🎨 **Flexible** - Customizable ratio, rounding, and formatting
- 🧪 **Well-tested** - Comprehensive test coverage

## Installation

```bash
npm install redenominasi-idr
```

or

```bash
yarn add redenominasi-idr
```

## Quick Start

### Basic Usage (Vanilla JS/TS)

```typescript
import { convert, format } from 'redenominasi-idr';

// Convert old nominal to new nominal
convert(15000); // 15
convert(500);   // 0.5
convert(50);    // 0.05

// Format with currency symbol
format(15000);  // "Rp 15"
format(500);    // "Rp 0,5"

// Custom configuration
format(15000, { 
  ratio: 1000,
  currencySymbol: 'IDR',
  decimalPlaces: 2 
}); // "IDR 15.00"
```

### React Usage

```tsx
import { useRedenominasi, CurrencyDisplay } from 'redenominasi-idr/react';

function PriceComponent() {
  const { format, convert } = useRedenominasi({
    ratio: 1000,
    roundingMode: 'round'
  });
  
  return (
    <div>
      <CurrencyDisplay value={15000} />
      {/* Displays: Rp 15 */}
      
      <p>{format(1500)}</p>
      {/* Displays: Rp 1,5 */}
    </div>
  );
}
```

### React with Provider

```tsx
import { RedenominasiProvider, CurrencyDisplay } from 'redenominasi-idr/react';

function App() {
  return (
    <RedenominasiProvider config={{ ratio: 1000, roundingMode: 'ceil' }}>
      <YourComponents />
    </RedenominasiProvider>
  );
}
```

## API Reference

### Core Functions

#### `convert(oldValue: number, config?: RedenominasiConfig): number`

Convert old nominal to new nominal.

```typescript
convert(15000);                    // 15
convert(500);                       // 0.5
convert(1555, { roundingMode: 'floor' }); // 1.55
```

#### `format(oldValue: number, config?: RedenominasiConfig): string`

Format old nominal with currency symbol.

```typescript
format(15000);                      // "Rp 15"
format(500, { showCurrency: false }); // "0.5"
```

#### `revert(newValue: number, config?: RedenominasiConfig): number`

Convert new nominal back to old nominal.

```typescript
revert(15);  // 15000
revert(0.5); // 500
```

#### `convertBulk(oldValues: number[], config?: RedenominasiConfig): number[]`

Convert multiple values at once (optimized for performance).

```typescript
convertBulk([15000, 500, 1000]); // [15, 0.5, 1]
```

### Configuration

```typescript
interface RedenominasiConfig {
  ratio?: number;           // Default: 1000
  locale?: string;          // Default: 'id-ID'
  roundingMode?: 'floor' | 'ceil' | 'round'; // Default: 'round'
  decimalPlaces?: number;   // Default: 2
  showCurrency?: boolean;   // Default: true
  currencySymbol?: string;  // Default: 'Rp'
}
```

### Global Configuration

```typescript
import { setGlobalConfig, getGlobalConfig, resetGlobalConfig } from 'redenominasi-idr';

// Set global config
setGlobalConfig({ 
  ratio: 1000, 
  roundingMode: 'ceil' 
});

// Get current global config
const config = getGlobalConfig();

// Reset to defaults
resetGlobalConfig();
```

### React Hooks

#### `useRedenominasi(config?: RedenominasiConfig)`

Main hook for redenomination operations.

```tsx
const { convert, format, revert, config } = useRedenominasi({
  ratio: 1000,
  roundingMode: 'round'
});
```

### React Components

#### `<CurrencyDisplay />`

Display formatted currency value.

```tsx
<CurrencyDisplay 
  value={15000} 
  config={{ decimalPlaces: 2 }}
  className="price"
  as="span"
/>
```

#### `<CurrencyInput />`

Input component for currency values.

```tsx
<CurrencyInput
  value={price}
  onChange={(newValue) => setPrice(newValue)}
  config={{ ratio: 1000 }}
  placeholder="Enter amount"
/>
```

## Use Cases

### Case 1: Normal Price Display

```typescript
format(15000); // "Rp 15"
```

### Case 2: Values Below Rp 1

```typescript
format(50);  // "Rp 0,05"
format(500); // "Rp 0,5"
```

### Case 3: Decimal Values

```typescript
format(1500, { decimalPlaces: 2 }); // "Rp 1,50"
```

### Case 4: User Input Handling

```tsx
import { sanitizeInput } from 'redenominasi-idr';

const handleInput = (input: string) => {
  const value = sanitizeInput(input);
  if (value !== null) {
    // Valid input
    saveToBackend(value);
  }
};
```

### Case 5: Discount Calculation

```typescript
const price = 1500;
const newPrice = convert(price);  // 1.5
const discount = newPrice * 0.1;   // 0.15
format(discount * 1000);           // "Rp 0,15"
```

### Case 6: Bulk Data Formatting

```tsx
import { formatBulk } from 'redenominasi-idr';

const prices = [15000, 500, 1000, 2500];
const formatted = formatBulk(prices);
// ["Rp 15", "Rp 0,5", "Rp 1", "Rp 2,5"]
```

### Case 7: Multi-Currency Support

```typescript
// Indonesian Rupiah
format(15000, { locale: 'id-ID', currencySymbol: 'Rp' });

// International format
format(15000, { locale: 'en-US', currencySymbol: 'IDR' });
```

### Case 8: Payment Gateway Integration

```typescript
// Frontend (display new nominal)
const displayPrice = convert(15000); // 15

// Backend (send old nominal)
const backendPrice = revert(displayPrice); // 15000
```

## Advanced Examples

### Custom Rounding Strategy

```typescript
// For cash transactions
const cashPrice = convert(1555, { 
  roundingMode: 'ceil',
  decimalPlaces: 0 
}); // 2

// For digital transactions
const digitalPrice = convert(1555, { 
  roundingMode: 'round',
  decimalPlaces: 2 
}); // 1.56
```

### React Table with Virtualization

```tsx
import { formatBulk } from 'redenominasi-idr/react';
import { useVirtual } from 'react-virtual';

function PriceTable({ prices }: { prices: number[] }) {
  const formattedPrices = formatBulk(prices);
  
  return (
    <table>
      {formattedPrices.map((price, i) => (
        <tr key={i}>
          <td>{price}</td>
        </tr>
      ))}
    </table>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © Muhammad Seman

## Support

- 📖 [Documentation](https://github.com/muhammad-seman/redenominasi-idr)
- 🐛 [Issue Tracker](https://github.com/muhammad-seman/redenominasi-idr/issues)
- 💬 [Discussions](https://github.com/muhammad-seman/redenominasi-idr/discussions)
