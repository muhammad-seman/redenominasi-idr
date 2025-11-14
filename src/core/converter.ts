import { RedenominasiConfig, ConversionResult } from '../types';
import { mergeConfig } from './config';
import { applyRounding } from '../utils/rounding';

/**
 * Convert old nominal to new nominal based on redenomination ratio
 * @param oldValue - The old nominal value (e.g., 15000)
 * @param config - Optional configuration
 * @returns The new nominal value (e.g., 15)
 */
export function convert(oldValue: number, config?: Partial<RedenominasiConfig>): number {
  const { ratio, roundingMode, decimalPlaces } = mergeConfig(config);

  if (typeof oldValue !== 'number' || isNaN(oldValue)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  const newValue = oldValue / ratio;
  return applyRounding(newValue, roundingMode, decimalPlaces);
}

/**
 * Convert new nominal back to old nominal
 * @param newValue - The new nominal value (e.g., 15)
 * @param config - Optional configuration
 * @returns The old nominal value (e.g., 15000)
 */
export function revert(newValue: number, config?: Partial<RedenominasiConfig>): number {
  const { ratio } = mergeConfig(config);

  if (typeof newValue !== 'number' || isNaN(newValue)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  return newValue * ratio;
}

/**
 * Convert multiple values at once (for bulk operations)
 * @param oldValues - Array of old nominal values
 * @param config - Optional configuration
 * @returns Array of new nominal values
 */
export function convertBulk(oldValues: number[], config?: Partial<RedenominasiConfig>): number[] {
  return oldValues.map(value => convert(value, config));
}

/**
 * Convert and return detailed information
 * @param oldValue - The old nominal value
 * @param config - Optional configuration
 * @returns Conversion result with detailed information
 */
export function convertDetailed(oldValue: number, config?: Partial<RedenominasiConfig>): ConversionResult {
  const newValue = convert(oldValue, config);
  const { format } = require('./formatter');

  return {
    oldValue,
    newValue,
    formatted: format(oldValue, config),
  };
}
