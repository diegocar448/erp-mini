import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';

export const ProdutoShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="nome" />
      <TextField source="descricao" />
      <NumberField source="preco" />
      <NumberField source="quantidade" />
    </SimpleShowLayout>
  </Show>
);
