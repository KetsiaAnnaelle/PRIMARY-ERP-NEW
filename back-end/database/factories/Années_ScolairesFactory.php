<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Années_Scolaires;
use App\Models\Ecole;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Années_ScolairesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     *
     */

     use HasFactory;

     protected $model = Années_Scolaires::class;
     
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-2 years', 'now');
        $endDate = (clone $startDate)->modify('+1 year');

        return [
            'annee_debut' => $startDate,
            'annee_fin' => $endDate,
            'ecole_id' => Ecole::factory(), // Crée un nouvel enregistrement dans la table 'ecole' via son factory
        ];
    }
}
