<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProdutoController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/produto', ProdutoController::class);

    Route::prefix('carrinho')->group(function () {
        Route::post('adicionar', [CarrinhoController::class, 'adicionar']);
        Route::get('/', [CarrinhoController::class, 'verCarrinho']);
        Route::post('remover', [CarrinhoController::class, 'remover']);
        Route::post('finalizar', [CarrinhoController::class, 'finalizar']);
    });
    
    Route::get('/cep/{cep}', function ($cep) {
        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");
        
        if ($response->failed() || isset($response['erro'])) {
            return response()->json(['error' => 'CEP inválido'], 422);
        }

        return response()->json($response->json());
    });
});
