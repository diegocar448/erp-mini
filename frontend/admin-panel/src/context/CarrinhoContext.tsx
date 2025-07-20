import { createContext, useContext, useState, ReactNode } from 'react';

export interface ProdutoCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: ProdutoCarrinho[];
  adicionarProduto: (produto: ProdutoCarrinho) => void;
  removerProduto: (id: number) => void;
  limparCarrinho: () => void;
  subtotal: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itens, setItens] = useState<ProdutoCarrinho[]>([]);

  const adicionarProduto = (produto: ProdutoCarrinho) => {
    setItens(prev => {
      const existente = prev.find(p => p.id === produto.id);
      if (existente) {
        return prev.map(p => p.id === produto.id ? { ...p, quantidade: p.quantidade + produto.quantidade } : p);
      }
      return [...prev, produto];
    });
  };

  const removerProduto = (id: number) => {
    setItens(prev => prev.filter(p => p.id !== id));
  };

  const limparCarrinho = () => setItens([]);

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarProduto, removerProduto, limparCarrinho, subtotal }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return context;
};
