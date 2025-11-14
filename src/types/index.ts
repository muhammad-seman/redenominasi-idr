export type RoundingMode = 'floor' | 'ceil' | 'round';

export interface RedenominasiConfig {
  ratio?: number;
  locale?: string;
  roundingMode?: RoundingMode;
  decimalPlaces?: number;
  showCurrency?: boolean;
  currencySymbol?: string;
}

export interface ConversionResult {
  oldValue: number;
  newValue: number;
  formatted: string;
}
