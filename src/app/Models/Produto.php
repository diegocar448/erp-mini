<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Estoque;
use App\Models\Variacao;
use App\Models\Pedido;

class Produto extends Model
{
    use HasFactory;

    protected $table = 'produtos';

    protected $fillable = [
        'nome',
        'descricao',
        'preco',
    ];

    public function estoque()
    {
        return $this->hasOne(Estoque::class);
    }

    public function variacoes()
    {
        return $this->hasMany(Variacao::class);
    }

    // No Produto.php
    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedido_produto')
            ->withPivot('quantidade', 'preco_unitario')
            ->withTimestamps();
    }
}
