import { RedenominasiConfig } from '../types';
import { mergeConfig } from './config';
import { convert } from './converter';
import { formatDecimal } from '../utils/rounding';

/**
 * Format old nominal to new nominal with currency symbol
 * @param oldValue - The old nominal value (e.g., 15000)
 * @param config - Optional configuration
 * @returns Formatted string (e.g., "Rp 15")
 */
export function format(oldValue: number, config?: Partial<RedenominasiConfig>): string {
  const finalConfig = mergeConfig(config);
  const newValue = convert(oldValue, finalConfig);

  return formatValue(newValue, finalConfig);
}

/**
 * Format a value that's already been converted
 * @param newValue - The new nominal value
 * @param config - Optional configuration
 * @returns Formatted string
 */
export function formatValue(newValue: number, config?: Partial<RedenominasiConfig>): string {
  const { locale, showCurrency, currencySymbol, decimalPlaces } = mergeConfig(config);

  // Format number with locale
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  }).format(newValue);

  // Add currency symbol if needed
  if (showCurrency) {
    return `${currencySymbol} ${formattedNumber}`;
  }

  return formattedNumber;
}

/**
 * Format multiple values at once
 * @param oldValues - Array of old nominal values
 * @param config - Optional configuration
 * @returns Array of formatted strings
 */
export function formatBulk(oldValues: number[], config?: Partial<RedenominasiConfig>): string[] {
  return oldValues.map(value => format(value, config));
}

/**
 * Parse formatted string back to number
 * @param formattedValue - Formatted string (e.g., "Rp 15.000" or "Rp 15")
 * @returns Parsed number
 */
export function parse(formattedValue: string): number {
  // Remove currency symbol and whitespace
  const cleaned = formattedValue
    .replace(/Rp/gi, '')
    .replace(/\s/g, '')
    .replace(/\./g, '') // Remove thousand separator (Indonesian uses dot)
    .replace(',', '.'); // Replace decimal comma with dot

  const parsed = parseFloat(cleaned);

  if (isNaN(parsed)) {
    throw new Error('Invalid formatted value');
  }

  return parsed;
}

/**
 * Format for display in different contexts
 * @param oldValue - The old nominal value
 * @param context - Display context ('table' | 'invoice' | 'compact')
 * @param config - Optional configuration
 * @returns Formatted string
 */
export function formatForContext(
  oldValue: number,
  context: 'table' | 'invoice' | 'compact',
  config?: Partial<RedenominasiConfig>
): string {
  const baseConfig = mergeConfig(config);

  switch (context) {
    case 'table':
      // Right-aligned, consistent decimal places
      return format(oldValue, { ...baseConfig, decimalPlaces: 2 });
    case 'invoice':
      // Full format with currency
      return format(oldValue, { ...baseConfig, showCurrency: true });
    case 'compact':
      // No decimals for small screens
      return format(oldValue, { ...baseConfig, decimalPlaces: 0 });
    default:
      return format(oldValue, baseConfig);
  }
}
