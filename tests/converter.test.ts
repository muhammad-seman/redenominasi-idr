import { convert, revert, convertBulk } from '../src/core/converter';

describe('Converter', () => {
  describe('convert', () => {
    it('should convert 15000 to 15', () => {
      expect(convert(15000)).toBe(15);
    });

    it('should convert 500 to 0.5', () => {
      expect(convert(500)).toBe(0.5);
    });

    it('should convert 50 to 0.05', () => {
      expect(convert(50)).toBe(0.05);
    });

    it('should handle custom ratio', () => {
      expect(convert(10000, { ratio: 100 })).toBe(100);
    });

    it('should apply floor rounding', () => {
      expect(convert(1555, { roundingMode: 'floor' })).toBe(1.55);
    });

    it('should apply ceil rounding', () => {
      expect(convert(1551, { roundingMode: 'ceil' })).toBe(1.56);
    });

    it('should throw error for invalid input', () => {
      expect(() => convert(NaN)).toThrow('Invalid input');
      expect(() => convert('invalid' as any)).toThrow('Invalid input');
    });
  });

  describe('revert', () => {
    it('should revert 15 to 15000', () => {
      expect(revert(15)).toBe(15000);
    });

    it('should revert 0.5 to 500', () => {
      expect(revert(0.5)).toBe(500);
    });

    it('should handle custom ratio', () => {
      expect(revert(100, { ratio: 100 })).toBe(10000);
    });
  });

  describe('convertBulk', () => {
    it('should convert multiple values', () => {
      const result = convertBulk([15000, 500, 1000]);
      expect(result).toEqual([15, 0.5, 1]);
    });

    it('should handle empty array', () => {
      expect(convertBulk([])).toEqual([]);
    });
  });
});
