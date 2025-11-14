import { format, formatBulk, parse } from '../src/core/formatter';

describe('Formatter', () => {
  describe('format', () => {
    it('should format 15000 to "Rp 15"', () => {
      expect(format(15000)).toBe('Rp 15');
    });

    it('should format 500 to "Rp 0,5"', () => {
      const result = format(500);
      expect(result).toMatch(/Rp 0[,.]5/);
    });

    it('should format without currency symbol', () => {
      expect(format(15000, { showCurrency: false })).toBe('15');
    });

    it('should use custom currency symbol', () => {
      expect(format(15000, { currencySymbol: 'IDR' })).toBe('IDR 15');
    });

    it('should handle decimal places', () => {
      const result = format(1500, { decimalPlaces: 2 });
      expect(result).toMatch(/Rp 1[,.]5/);
    });
  });

  describe('formatBulk', () => {
    it('should format multiple values', () => {
      const result = formatBulk([15000, 1000, 500]);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Rp 15');
    });
  });

  describe('parse', () => {
    it('should parse "Rp 15" to 15', () => {
      expect(parse('Rp 15')).toBe(15);
    });

    it('should parse "Rp 15.000" to 15000', () => {
      expect(parse('Rp 15.000')).toBe(15000);
    });

    it('should parse "Rp 0,5" to 0.5', () => {
      expect(parse('Rp 0,5')).toBe(0.5);
    });

    it('should throw error for invalid input', () => {
      expect(() => parse('invalid')).toThrow('Invalid formatted value');
    });
  });
});
