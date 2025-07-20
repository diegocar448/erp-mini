import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const ProdutoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="nome" required />
      <TextInput source="descricao" />
      <NumberInput source="preco" required />
      <NumberInput source="quantidade" />
    </SimpleForm>
  </Edit>
);
