<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = [
        'user_id',
        'subtotal',
        'frete',
        'total',
        'cep',
        'endereco',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'frete' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    // Relacionamento: Pedido pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento: Pedido possui muitos produtos
    public function produtos()
    {
        return $this->belongsToMany(Produto::class, 'pedido_produto')
            ->withPivot('quantidade', 'preco_unitario')
            ->withTimestamps();
    }

    // Mutator para garantir que total seja sempre a soma de subtotal + frete
    public function setTotalAttribute($value)
    {
        $this->attributes['total'] = $value ?? ($this->subtotal + $this->frete);
    }
}
