import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin';
import { CurrencyInput } from '@/components/CurrencyInput';

export const ProdutoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nome" label="Nome" validate={required()} fullWidth />
      <TextInput source="descricao" label="Descrição" fullWidth multiline />
      <CurrencyInput source="preco" label="Preço base" validate={[required(), minValue(0)]} />

      <NumberInput source="quantidade" label="Estoque total" validate={[required(), minValue(0)]} />

      <ArrayInput source="variacoes" label="Variações">
        <SimpleFormIterator>
          <TextInput source="nome" label="Nome da variação" validate={required()} />
          <CurrencyInput source="preco" label="Preço" />
          <NumberInput source="quantidade" label="Estoque" validate={[required(), minValue(0)]} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
