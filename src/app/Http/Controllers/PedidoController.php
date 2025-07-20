<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{

    public function index(Request $request)
    {
        $pedidos = Pedido::with(['produtos']) // carrega produtos
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($pedidos);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'produtos' => 'required|array',
            'produtos.*.produto_id' => 'required|exists:produtos,id',
            'produtos.*.quantidade' => 'required|integer|min:1',
            'cep' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            $subtotal = 0;

            foreach ($data['produtos'] as $item) {
                $produto = Produto::find($item['produto_id']);
                $subtotal += $produto->preco * $item['quantidade'];
            }

            // Calcula frete
            $frete = 20.00;
            if ($subtotal >= 52.00 && $subtotal <= 166.59) {
                $frete = 15.00;
            } elseif ($subtotal > 200.00) {
                $frete = 0.00;
            }

            $pedido = Pedido::create([
                'user_id' => $request->user()->id,
                'subtotal' => $subtotal,
                'frete' => $frete,
                'total' => $subtotal + $frete,
                'cep' => $data['cep'],
                'endereco' => '', // se você quiser capturar endereço depois via ViaCEP
            ]);

            foreach ($data['produtos'] as $item) {
                $produto = Produto::find($item['produto_id']);
                $pedido->produtos()->attach($item['produto_id'], [
                    'quantidade' => $item['quantidade'],
                    'preco_unitario' => $produto->preco,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pedido criado com sucesso',
                'pedido_id' => $pedido->id,
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Erro ao salvar pedido',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
