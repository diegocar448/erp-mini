import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  subtotal: number;
};

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export default function CarrinhoPage() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [frete, setFrete] = useState(0);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  useEffect(() => {
    const calcularSubtotal = itens.reduce((total, item) => total + item.subtotal, 0);
    setSubtotal(calcularSubtotal);

    if (calcularSubtotal >= 52 && calcularSubtotal <= 166.59) {
      setFrete(15);
    } else if (calcularSubtotal > 200) {
      setFrete(0);
    } else {
      setFrete(20);
    }
  }, [itens]);

  const buscarEndereco = async () => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(data);
    } catch (error) {
      alert('Erro ao buscar endereço.');
    }
  };

  const removerItem = (id: number) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const finalizarCompra = () => {
    alert('Compra finalizada!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Carrinho</h2>
      {itens.length === 0 ? (
        <p>Carrinho vazio.</p>
      ) : (
        <>
          <ul>
            {itens.map((item) => (
              <li key={item.id}>
                {item.nome} - R$ {item.preco.toFixed(2)} x {item.quantidade} = R$ {item.subtotal.toFixed(2)}
                <button onClick={() => removerItem(item.id)} style={{ marginLeft: 10 }}>
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <hr />
          <p><strong>Subtotal:</strong> R$ {subtotal.toFixed(2)}</p>
          <p><strong>Frete:</strong> R$ {frete.toFixed(2)}</p>
          <p><strong>Total:</strong> R$ {(subtotal + frete).toFixed(2)}</p>

          <div style={{ marginTop: 20 }}>
            <h3>Endereço de entrega</h3>
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP"
              style={{ padding: 8, width: 200 }}
            />
            <button onClick={buscarEndereco} style={{ marginLeft: 10 }}>
              Buscar CEP
            </button>

            {endereco && (
              <div style={{ marginTop: 10 }}>
                <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
                <p><strong>Bairro:</strong> {endereco.bairro}</p>
                <p><strong>Cidade:</strong> {endereco.localidade} - {endereco.uf}</p>
              </div>
            )}
          </div>

          <button onClick={finalizarCompra} style={{ marginTop: 20 }}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
