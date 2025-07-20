// src/pages/produtos/ProdutoCreate.tsx
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  useNotify,
} from 'react-admin';
import { CurrencyInput } from '@/components/CurrencyInput'; // ajuste o caminho se necessário
//import { CurrencyInput } from '../../components/CurrencyInput'; // ajuste o caminho se necessário

// Validações personalizadas
const validateNome = [required('O nome é obrigatório')];
const validatePreco = [
  required('O preço é obrigatório'),
  minValue(0, 'O preço deve ser maior ou igual a 0'),
];
const validateQuantidade = [
  required('A quantidade é obrigatória'),
  minValue(0, 'A quantidade deve ser maior ou igual a 0'),
];

export const ProdutoCreate = () => {
  const notify = useNotify();

  return (
    <Create
      title="Criar Produto"
      mutationOptions={{
        onSuccess: () => notify('Produto criado com sucesso!', { type: 'success' }),
        onError: () => notify('Erro ao criar o produto', { type: 'error' }),
      }}
    >
      <SimpleForm>
        <TextInput
          source="nome"
          label="Nome"
          validate={validateNome}
          fullWidth
        />
        <TextInput
          source="descricao"
          label="Descrição"
          multiline
          fullWidth
        />
        <CurrencyInput
          source="preco"
          label="Preço"
          validate={validatePreco}
        />
        <NumberInput
          source="quantidade"
          label="Quantidade"
          validate={validateQuantidade}
          min={0}
        />
      </SimpleForm>
    </Create>
  );
};
