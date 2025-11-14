import { RoundingMode } from '../types';

export function applyRounding(value: number, mode: RoundingMode, decimalPlaces: number = 2): number {
  const multiplier = Math.pow(10, decimalPlaces);

  switch (mode) {
    case 'floor':
      return Math.floor(value * multiplier) / multiplier;
    case 'ceil':
      return Math.ceil(value * multiplier) / multiplier;
    case 'round':
    default:
      return Math.round(value * multiplier) / multiplier;
  }
}

export function formatDecimal(value: number, decimalPlaces: number = 2): string {
  return value.toFixed(decimalPlaces).replace(/\.?0+$/, '');
}
