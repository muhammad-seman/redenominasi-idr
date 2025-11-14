import React from 'react';
import { RedenominasiConfig } from '../../types';
import { format } from '../../core/formatter';

export interface CurrencyDisplayProps {
  value: number;
  config?: Partial<RedenominasiConfig>;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component to display formatted currency
 */
export function CurrencyDisplay({
  value,
  config,
  className,
  as: Component = 'span'
}: CurrencyDisplayProps) {
  const formatted = React.useMemo(() => format(value, config), [value, config]);

  return <Component className={className}>{formatted}</Component>;
}

export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  config?: Partial<RedenominasiConfig>;
}

/**
 * Input component for currency values
 */
export function CurrencyInput({
  value,
  onChange,
  config,
  ...inputProps
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = React.useState(format(value, config));

  React.useEffect(() => {
    setDisplayValue(format(value, config));
  }, [value, config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayValue(input);

    // Try to parse the input
    try {
      const cleaned = input
        .replace(/Rp/gi, '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    } catch (error) {
      // Invalid input, don't update
    }
  };

  const handleBlur = () => {
    // Reformat on blur
    setDisplayValue(format(value, config));
  };

  return (
    <input
      {...inputProps}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
