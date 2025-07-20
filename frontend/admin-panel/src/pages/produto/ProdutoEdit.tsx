import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin';
import { CurrencyInput } from '@/components/CurrencyInput';

export const ProdutoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nome" label="Nome" validate={required()} fullWidth />
      <TextInput source="descricao" label="Descrição" fullWidth multiline />
      
      <CurrencyInput
        source="preco"
        label="Preço base"
        validate={[required(), minValue(0)]}
        parse={parseCurrency}
        format={formatCurrency}
      />

      <NumberInput
        source="quantidade"
        label="Estoque total"
        validate={[required(), minValue(0)]}
      />

      <ArrayInput source="variacoes" label="Variações">
        <SimpleFormIterator>
          <TextInput source="nome" label="Nome da variação" validate={required()} />
          <CurrencyInput
            source="preco"
            label="Preço"
            parse={parseCurrency}
            format={formatCurrency}
          />
          <NumberInput source="quantidade" label="Estoque" validate={[required(), minValue(0)]} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

// Funções para conversão correta do campo de moeda
function parseCurrency(value?: string): number | null {
  if (!value) return null;
  return parseFloat(
    value
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim()
  );
}

function formatCurrency(value?: number): string {
  if (value === undefined || value === null) return '';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
