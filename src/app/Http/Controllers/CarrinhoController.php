<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CarrinhoController extends Controller
{
    public function adicionar(Request $request)
    {
        $validated = $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'quantidade' => 'required|integer|min:1',
        ]);

        $produto = Produto::with('estoque')->findOrFail($request->produto_id);
        $carrinho = session()->get('carrinho', []);

        $itemId = (string) $produto->id;

        if (isset($carrinho[$itemId])) {
            $carrinho[$itemId]['quantidade'] += $request->quantidade;
        } else {
            $carrinho[$itemId] = [
                'produto_id' => $produto->id,
                'nome' => $produto->nome,
                'preco' => $produto->preco,
                'quantidade' => $request->quantidade,
            ];
        }

        session()->put('carrinho', $carrinho);

        return response()->json(['message' => 'Produto adicionado ao carrinho com sucesso.', 'carrinho' => $carrinho]);
    }

    public function verCarrinho()
    {
        $carrinho = session()->get('carrinho', []);
        $subtotal = array_reduce($carrinho, fn($carry, $item) => $carry + $item['preco'] * $item['quantidade'], 0);

        $frete = 20.0;
        if ($subtotal >= 52.00 && $subtotal <= 166.59) {
            $frete = 15.0;
        } elseif ($subtotal > 200.00) {
            $frete = 0.0;
        }

        return response()->json([
            'itens' => array_values($carrinho),
            'subtotal' => round($subtotal, 2),
            'frete' => $frete,
            'total' => round($subtotal + $frete, 2),
        ]);
    }

    public function remover(Request $request)
    {
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
        ]);

        $carrinho = session()->get('carrinho', []);
        unset($carrinho[$request->produto_id]);

        session()->put('carrinho', $carrinho);

        return response()->json(['message' => 'Produto removido.', 'carrinho' => $carrinho]);
    }

    public function finalizar(Request $request)
    {
        // Aqui você pode salvar o pedido real no banco de dados, etc.
        session()->forget('carrinho');

        return response()->json(['message' => 'Pedido finalizado com sucesso.']);
    }
}
