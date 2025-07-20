<?php

namespace Database\Factories;

use App\Models\Estoque;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Estoque>
 */
class EstoqueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Estoque::class;

    public function definition(): array
    {
        return [
            'quantidade' => $this->faker->numberBetween(0, 100),
            // 'produto_id' será preenchido no ProdutoFactory
        ];
    }
}
