// src/pages/CarrinhoPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCarrinho } from '@/context/CarrinhoContext';

const CarrinhoPage = () => {
  const { carrinho, limparCarrinho } = useCarrinho();
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [erroCep, setErroCep] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  const frete = subtotal >= 100 ? 0 : 20;
  const total = subtotal + frete;

  useEffect(() => {
    const validarCep = async () => {
      if (cep.length !== 8) {
        setEndereco('');
        setErroCep('');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/cep/${cep}`);
        const data = response.data;

        setEndereco(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`);
        setErroCep('');
      } catch (err) {
        setEndereco('');
        setErroCep('CEP inválido');
      }
    };

    validarCep();
  }, [cep]);

  const finalizarPedido = async () => {
    if (!cep || erroCep) {
      alert('Por favor, insira um CEP válido antes de finalizar o pedido.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/pedidos', {
        produtos: carrinho.map(item => ({
          produto_id: item.id,
          quantidade: item.quantidade,
        })),
        cep: cep,
      });

      alert('Pedido criado com sucesso! ID: ' + response.data.pedido_id);
      limparCarrinho();
      setCep('');
      setEndereco('');
    } catch (error: any) {
      console.error(error);
      alert('Erro ao criar pedido: ' + (error.response?.data?.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {carrinho.map(item => (
              <li key={item.id}>
                {item.nome} - R$ {item.preco.toFixed(2)} x {item.quantidade}
              </li>
            ))}
          </ul>

          <p><strong>Subtotal:</strong> R$ {subtotal.toFixed(2)}</p>
          <p><strong>Frete:</strong> R$ {frete.toFixed(2)}</p>
          <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>

          <div style={{ marginTop: '1rem' }}>
            <label>
              CEP:
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                maxLength={8}
                style={{ marginLeft: '1rem' }}
              />
            </label>
            {erroCep && <p style={{ color: 'red' }}>{erroCep}</p>}
            {endereco && <p><strong>Endereço:</strong> {endereco}</p>}
          </div>

          <button
            onClick={finalizarPedido}
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Finalizando...' : 'Finalizar Pedido'}
          </button>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
