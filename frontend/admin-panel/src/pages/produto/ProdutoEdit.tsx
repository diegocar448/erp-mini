import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  useNotify,
  useRedirect,
  useRefresh,
  required,
  minValue,
} from "react-admin";
import { CurrencyInput } from "../../components/CurrencyInput"; // ajuste o caminho se necessário

// Validações
const validateNome = [required("O nome é obrigatório")];
const validatePreco = [required("O preço é obrigatório"), minValue(0, "O preço deve ser maior ou igual a 0")];
const validateQuantidade = [required("A quantidade é obrigatória"), minValue(0, "A quantidade deve ser maior ou igual a 0")];

export const ProdutoEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();

  const handleSave = (data: any) => {
    // Converte strings numéricas em números
    return {
      ...data,
      preco: parseFloat(data.preco),
      quantidade: parseInt(data.quantidade, 10),
    };
  };

  const onSuccess = () => {
    notify("Produto atualizado com sucesso", { type: "success" });
    redirect("/produto");
    refresh();
  };

  return (
    <Edit mutationOptions={{ onSuccess }}>
      <SimpleForm transform={handleSave}>
        <TextInput source="nome" label="Nome" validate={validateNome} fullWidth />
        <TextInput source="descricao" label="Descrição" multiline fullWidth />
        <CurrencyInput source="preco" label="Preço" validate={validatePreco} />
        <NumberInput source="quantidade" label="Quantidade" validate={validateQuantidade} />
      </SimpleForm>
    </Edit>
  );
};
