<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    // GET /produto
    public function index(Request $request)
    {
        // Decodifica os parâmetros
        $range = json_decode($request->query('range', '[0, 9]'), true);
        $sort = json_decode($request->query('sort', '["id", "ASC"]'), true);

        $start = $range[0];
        $end = $range[1];
        $perPage = $end - $start + 1;
        $sortColumn = $sort[0];
        $sortDirection = $sort[1];

        $query = Produto::with('estoque')->orderBy($sortColumn, $sortDirection);
        $total = $query->count();
        $produtos = $query->skip($start)->take($perPage)->get();

        $result = $produtos->map(function ($produto) {
            return [
                'id' => $produto->id,
                'nome' => $produto->nome,
                'descricao' => $produto->descricao,
                'preco' => $produto->preco,
                'quantidade' => optional($produto->estoque)->quantidade ?? 0,
                'created_at' => $produto->created_at,
                'updated_at' => $produto->updated_at,
            ];
        });

        return response()
            ->json($result)
            ->header('Content-Range', "produto $start-$end/$total")
            ->header('Access-Control-Expose-Headers', 'Content-Range');
    }

    // POST /produto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|min:3|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric|min:0',
            'quantidade' => 'sometimes|required|integer|min:0',
        ]);

        $produto = Produto::create($request->only(['nome', 'descricao', 'preco']));

        $produto->estoque()->create([
            'quantidade' => $request->input('quantidade', 0)
        ]);

        // Retorna o objeto completo já com quantidade
        return $this->show($produto->id);
    }

    // GET /produto/{id}
    public function show(string $id)
    {
        $produto = Produto::with('estoque')->findOrFail($id);

        return response()->json([
            'id' => $produto->id,
            'nome' => $produto->nome,
            'descricao' => $produto->descricao,
            'preco' => $produto->preco,
            'quantidade' => optional($produto->estoque)->quantidade ?? 0,
            'created_at' => $produto->created_at,
            'updated_at' => $produto->updated_at,
        ]);
    }

    // PUT/PATCH /produto/{id}
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'sometimes|required|numeric|min:0',
            'quantidade' => 'sometimes|required|integer|min:0',
        ]);

        $produto = Produto::findOrFail($id);
        $produto->update($request->only(['nome', 'descricao', 'preco']));

        $produto->estoque()->updateOrCreate([], [
            'quantidade' => $request->input('quantidade', 0)
        ]);

        // Retorna os dados atualizados
        return $this->show($produto->id);
    }

    // DELETE /produto/{id}
    public function destroy(string $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();

        return response()->json(['message' => 'Produto deletado com sucesso.']);
    }
}
