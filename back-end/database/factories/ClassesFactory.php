<?php

namespace Database\Factories;

use App\Models\Années_Scolaires;
use App\Models\Classes;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ClassesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    /**
     * Définir l'état par défaut des attributs du modèle.
     *
     * @return array
     */
    use HasFactory;
     protected $model = Classes::class;
    public function definition(): array
    {
        return [
            'nomCl' => $this->faker->word,
            'section' => $this->faker->word,
            'année_scolaire_id' => Années_Scolaires::factory(), // Utilisation d'une factory pour générer une année scolaire associée
        ];
    }
}
