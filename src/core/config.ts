import { RedenominasiConfig } from '../types';

export const DEFAULT_CONFIG: Required<RedenominasiConfig> = {
  ratio: 1000,
  locale: 'id-ID',
  roundingMode: 'round',
  decimalPlaces: 2,
  showCurrency: true,
  currencySymbol: 'Rp',
};

let globalConfig: Required<RedenominasiConfig> = { ...DEFAULT_CONFIG };

export function setGlobalConfig(config: Partial<RedenominasiConfig>): void {
  globalConfig = {
    ...globalConfig,
    ...config,
  };
}

export function getGlobalConfig(): Required<RedenominasiConfig> {
  return { ...globalConfig };
}

export function resetGlobalConfig(): void {
  globalConfig = { ...DEFAULT_CONFIG };
}

export function mergeConfig(config?: Partial<RedenominasiConfig>): Required<RedenominasiConfig> {
  return {
    ...globalConfig,
    ...config,
  };
}
