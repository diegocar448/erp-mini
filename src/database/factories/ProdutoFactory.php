<?php

namespace Database\Factories;

use App\Models\Produto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Produto>
 */
class ProdutoFactory extends Factory
{
    protected $model = Produto::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->word(),
            'descricao' => $this->faker->sentence(),
            'preco' => $this->faker->randomFloat(2, 10, 500),
        ];
    }

    // Adicione este método
    public function configure(): static
    {
        return $this->afterCreating(function (Produto $produto) {
            $produto->estoque()->create([
                'quantidade' => fake()->numberBetween(0, 100),
            ]);
        });
    }
}
