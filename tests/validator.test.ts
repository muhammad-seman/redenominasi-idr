import { isValidNumber, isPositiveNumber, sanitizeInput, validateConfig } from '../src/core/validator';

describe('Validator', () => {
  describe('isValidNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isValidNumber(15)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-5)).toBe(true);
    });

    it('should return false for invalid values', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('15' as any)).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(15)).toBe(true);
      expect(isPositiveNumber(0)).toBe(true);
    });

    it('should return false for negative numbers', () => {
      expect(isPositiveNumber(-5)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize number input', () => {
      expect(sanitizeInput(15)).toBe(15);
    });

    it('should sanitize string input', () => {
      expect(sanitizeInput('15000')).toBe(15000);
      expect(sanitizeInput('Rp 15.000')).toBe(15000);
      expect(sanitizeInput('Rp 0,5')).toBe(0.5);
    });

    it('should return null for invalid input', () => {
      expect(sanitizeInput('invalid')).toBe(null);
      expect(sanitizeInput(NaN)).toBe(null);
    });
  });

  describe('validateConfig', () => {
    it('should not throw for valid config', () => {
      expect(() => validateConfig({ ratio: 1000 })).not.toThrow();
      expect(() => validateConfig({ decimalPlaces: 2 })).not.toThrow();
      expect(() => validateConfig({ roundingMode: 'floor' })).not.toThrow();
    });

    it('should throw for invalid ratio', () => {
      expect(() => validateConfig({ ratio: -1 })).toThrow('Invalid ratio');
      expect(() => validateConfig({ ratio: 0 })).toThrow('Invalid ratio');
    });

    it('should throw for invalid decimalPlaces', () => {
      expect(() => validateConfig({ decimalPlaces: -1 })).toThrow('Invalid decimalPlaces');
      expect(() => validateConfig({ decimalPlaces: 2.5 })).toThrow('Invalid decimalPlaces');
    });

    it('should throw for invalid roundingMode', () => {
      expect(() => validateConfig({ roundingMode: 'invalid' })).toThrow('Invalid roundingMode');
    });
  });
});
