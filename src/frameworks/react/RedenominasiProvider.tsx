import React, { createContext, useContext, ReactNode } from 'react';
import { RedenominasiConfig } from '../../types';
import { setGlobalConfig, getGlobalConfig } from '../../core/config';

interface RedenominasiContextValue {
  config: Required<RedenominasiConfig>;
  updateConfig: (config: Partial<RedenominasiConfig>) => void;
}

const RedenominasiContext = createContext<RedenominasiContextValue | undefined>(undefined);

export interface RedenominasiProviderProps {
  children: ReactNode;
  config?: Partial<RedenominasiConfig>;
}

/**
 * Provider component for global redenomination configuration
 */
export function RedenominasiProvider({ children, config }: RedenominasiProviderProps) {
  React.useEffect(() => {
    if (config) {
      setGlobalConfig(config);
    }
  }, [config]);

  const updateConfig = React.useCallback((newConfig: Partial<RedenominasiConfig>) => {
    setGlobalConfig(newConfig);
  }, []);

  const value = React.useMemo(
    () => ({
      config: getGlobalConfig(),
      updateConfig,
    }),
    [updateConfig]
  );

  return (
    <RedenominasiContext.Provider value={value}>
      {children}
    </RedenominasiContext.Provider>
  );
}

/**
 * Hook to access redenomination context
 */
export function useRedenominasiContext(): RedenominasiContextValue {
  const context = useContext(RedenominasiContext);

  if (!context) {
    throw new Error('useRedenominasiContext must be used within RedenominasiProvider');
  }

  return context;
}
