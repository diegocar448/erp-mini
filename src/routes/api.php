<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CarrinhoController;
use App\Http\Controllers\PedidoController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Produtos (CRUD)
    Route::apiResource('/produto', ProdutoController::class);

    // Carrinho
    Route::prefix('carrinho')->group(function () {
        Route::post('adicionar', [CarrinhoController::class, 'adicionar']);
        Route::get('/', [CarrinhoController::class, 'verCarrinho']);
        Route::post('remover', [CarrinhoController::class, 'remover']);
        Route::post('finalizar', [CarrinhoController::class, 'finalizar']);
    });

    // Pedidos
    Route::post('/pedidos', [PedidoController::class, 'store']);

    Route::get('/pedidos', [PedidoController::class, 'index']);


    // Verificação de CEP via ViaCEP
    Route::get('/cep/{cep}', function ($cep) {
        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

        if ($response->failed() || isset($response['erro'])) {
            return response()->json(['error' => 'CEP inválido'], 422);
        }

        return response()->json($response->json());
    });
});
