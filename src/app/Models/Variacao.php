<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Produto;

class Variacao extends Model
{
    use HasFactory;

    protected $table = 'variacoes';

    protected $fillable = ['nome', 'preco', 'quantidade'];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}