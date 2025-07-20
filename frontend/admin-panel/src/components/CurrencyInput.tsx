// src/components/CurrencyInput.tsx
import { TextInput, TextInputProps } from 'react-admin';
import { useCallback } from 'react';

export const CurrencyInput = (props: TextInputProps) => {
  const parse = useCallback((value: string | number | null) => {
    if (typeof value === 'string') {
      // Remove tudo que não for número ou ponto
      const clean = value.replace(/[^\d,.-]/g, '').replace(',', '.');
      const number = parseFloat(clean);
      return isNaN(number) ? null : number;
    }
    return value;
  }, []);

  const format = useCallback((value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    return value;
  }, []);

  return <TextInput {...props} parse={parse} format={format} />;
};
