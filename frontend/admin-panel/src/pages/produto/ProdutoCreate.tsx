import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
} from 'react-admin';

// Validações personalizadas
const validateNome = [required('O nome é obrigatório')];
const validatePreco = [required('O preço é obrigatório'), minValue(0, 'O preço deve ser maior ou igual a 0')];
const validateQuantidade = [required('A quantidade é obrigatória'), minValue(0, 'A quantidade deve ser maior ou igual a 0')];


export const ProdutoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nome" label="Nome" required fullWidth validate={validateNome} fullWidth />
      <TextInput source="descricao" label="Descrição" multiline fullWidth />
      <NumberInput source="preco" label="Preço" required min={0} validate={validatePreco} />
      <NumberInput source="quantidade" label="Quantidade" required min={0} validate={validateQuantidade} />
    </SimpleForm>
  </Create>
);
