/**
 * Validate if a value is a valid number for conversion
 * @param value - The value to validate
 * @returns True if valid, false otherwise
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Validate if a value is a positive number
 * @param value - The value to validate
 * @returns True if valid positive number, false otherwise
 */
export function isPositiveNumber(value: unknown): value is number {
  return isValidNumber(value) && value >= 0;
}

/**
 * Validate and sanitize user input
 * @param input - User input (can be string or number)
 * @returns Sanitized number or null if invalid
 */
export function sanitizeInput(input: string | number): number | null {
  if (typeof input === 'number') {
    return isValidNumber(input) ? input : null;
  }

  if (typeof input === 'string') {
    // Remove currency symbols and whitespace
    const cleaned = input
      .replace(/Rp/gi, '')
      .replace(/\s/g, '')
      .replace(/\./g, '') // Remove thousand separator
      .replace(',', '.'); // Replace decimal comma with dot

    const parsed = parseFloat(cleaned);
    return isValidNumber(parsed) ? parsed : null;
  }

  return null;
}

/**
 * Validate ratio value
 * @param ratio - Ratio to validate
 * @returns True if valid ratio, false otherwise
 */
export function isValidRatio(ratio: unknown): ratio is number {
  return isValidNumber(ratio) && ratio > 0;
}

/**
 * Validate configuration object
 * @param config - Configuration to validate
 * @throws Error if configuration is invalid
 */
export function validateConfig(config: any): void {
  if (config.ratio !== undefined && !isValidRatio(config.ratio)) {
    throw new Error('Invalid ratio: must be a positive number');
  }

  if (config.decimalPlaces !== undefined) {
    if (!Number.isInteger(config.decimalPlaces) || config.decimalPlaces < 0) {
      throw new Error('Invalid decimalPlaces: must be a non-negative integer');
    }
  }

  if (config.roundingMode !== undefined) {
    const validModes = ['floor', 'ceil', 'round'];
    if (!validModes.includes(config.roundingMode)) {
      throw new Error(`Invalid roundingMode: must be one of ${validModes.join(', ')}`);
    }
  }
}
