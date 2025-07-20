// src/components/CurrencyInput.tsx
import { useInput, NumberInputProps } from 'react-admin';
import { NumericFormat } from 'react-number-format';

export const CurrencyInput = (props: NumberInputProps) => {
  const {
    field,
    fieldState: { error },
    isRequired,
  } = useInput(props);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{props.label}{isRequired && ' *'}</label>
      <NumericFormat
        {...field}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        customInput="input"
        onValueChange={(values) => {
          field.onChange(values.floatValue);
        }}
        style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
      />
      {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error.message}</p>}
    </div>
  );
};
