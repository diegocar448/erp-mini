import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pedido {
  id: number;
  subtotal: number;
  frete: number;
  total: number;
  cep: string;
  endereco: string;
  created_at: string;
  produtos: {
    id: number;
    nome: string;
    pivot: {
      quantidade: number;
      preco_unitario: number;
    };
  }[];
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pedidos', {
          withCredentials: true,
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Você ainda não realizou nenhum pedido.</p>
      ) : (
        pedidos.map(pedido => (
          <div key={pedido.id} className="border p-4 mb-4 rounded shadow">
            <p><strong>Pedido:</strong> #{pedido.id}</p>
            <p><strong>Data:</strong> {new Date(pedido.created_at).toLocaleString()}</p>
            <p><strong>CEP:</strong> {pedido.cep}</p>
            <p><strong>Subtotal:</strong> R$ {pedido.subtotal.toFixed(2)}</p>
            <p><strong>Frete:</strong> R$ {pedido.frete.toFixed(2)}</p>
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

            <h3 className="font-semibold mt-2">Produtos:</h3>
            <ul className="list-disc ml-5">
              {pedido.produtos.map(produto => (
                <li key={produto.id}>
                  {produto.nome} - {produto.pivot.quantidade}x R$ {produto.pivot.preco_unitario.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
