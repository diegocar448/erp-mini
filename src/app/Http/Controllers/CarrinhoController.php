<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CarrinhoController extends Controller
{
    public function finalizar(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'produtos' => 'required|array|min:1',
            'produtos.*.id' => 'required|integer|exists:produtos,id',
            'produtos.*.quantidade' => 'required|integer|min:1',
            'frete' => 'required|numeric|min:0',
            'cep' => 'required|string',
            'endereco' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $subtotal = 0;

            // Calcular subtotal
            foreach ($request->produtos as $item) {
                $produto = Produto::findOrFail($item['id']);
                $subtotal += $produto->preco * $item['quantidade'];
            }

            // Criar o pedido
            $pedido = Pedido::create([
                'user_id' => $user->id,
                'subtotal' => $subtotal,
                'frete' => $request->frete,
                'total' => $subtotal + $request->frete,
                'cep' => $request->cep,
                'endereco' => $request->endereco,
            ]);

            // Associar produtos ao pedido
            foreach ($request->produtos as $item) {
                $produto = Produto::findOrFail($item['id']);

                // Atualizar estoque
                if ($produto->estoque && $produto->estoque->quantidade >= $item['quantidade']) {
                    $produto->estoque->decrement('quantidade', $item['quantidade']);
                } else {
                    throw new \Exception("Estoque insuficiente para o produto: {$produto->nome}");
                }

                $pedido->produtos()->attach($produto->id, [
                    'quantidade' => $item['quantidade'],
                    'preco_unitario' => $produto->preco,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pedido finalizado com sucesso!',
                'pedido_id' => $pedido->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Erro ao finalizar o pedido.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
