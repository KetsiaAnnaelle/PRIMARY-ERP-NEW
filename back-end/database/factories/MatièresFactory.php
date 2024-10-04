<?php

namespace Database\Factories;

use App\Models\Matières;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MatièresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    use HasFactory;
     protected $model = Matières::class;
    public function definition(): array
    {
        return [
            'nomMat' => $this->faker->word, // Génère un mot aléatoire pour le nom de la matière
            'coef' => $this->faker->optional()->randomFloat(2, 1, 5), // Génère un coefficient aléatoire entre 1 et 5 ou NULL
        ];
    }
}
