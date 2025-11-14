import { useMemo, useCallback } from 'react';
import { RedenominasiConfig, ConversionResult } from '../../types';
import { convert as coreConvert, revert as coreRevert, convertBulk as coreConvertBulk } from '../../core/converter';
import { format as coreFormat, formatBulk as coreFormatBulk, parse as coreParse } from '../../core/formatter';
import { mergeConfig } from '../../core/config';

export interface UseRedenominasiReturn {
  convert: (oldValue: number) => number;
  revert: (newValue: number) => number;
  format: (oldValue: number) => string;
  parse: (formattedValue: string) => number;
  convertBulk: (oldValues: number[]) => number[];
  formatBulk: (oldValues: number[]) => string[];
  config: Required<RedenominasiConfig>;
}

/**
 * React hook for redenomination operations
 * @param config - Optional configuration
 * @returns Object with conversion and formatting functions
 */
export function useRedenominasi(config?: Partial<RedenominasiConfig>): UseRedenominasiReturn {
  const finalConfig = useMemo(() => mergeConfig(config), [config]);

  const convert = useCallback(
    (oldValue: number) => coreConvert(oldValue, finalConfig),
    [finalConfig]
  );

  const revert = useCallback(
    (newValue: number) => coreRevert(newValue, finalConfig),
    [finalConfig]
  );

  const format = useCallback(
    (oldValue: number) => coreFormat(oldValue, finalConfig),
    [finalConfig]
  );

  const parse = useCallback(
    (formattedValue: string) => coreParse(formattedValue),
    []
  );

  const convertBulk = useCallback(
    (oldValues: number[]) => coreConvertBulk(oldValues, finalConfig),
    [finalConfig]
  );

  const formatBulk = useCallback(
    (oldValues: number[]) => coreFormatBulk(oldValues, finalConfig),
    [finalConfig]
  );

  return {
    convert,
    revert,
    format,
    parse,
    convertBulk,
    formatBulk,
    config: finalConfig,
  };
}
