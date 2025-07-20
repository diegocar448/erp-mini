import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
} from 'react-admin';

export const ProdutoList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="nome" />
      <TextField source="descricao" />
      <NumberField source="preco" />
      <NumberField source="quantidade" /> {/* Novo campo exibido */}
    </Datagrid>
  </List>
);