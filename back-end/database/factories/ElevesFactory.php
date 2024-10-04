<?php

namespace Database\Factories;

use App\Models\Classes;
use App\Models\Eleves;
use App\Models\Parents;
use App\Models\Transports_Scolaires;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ElevesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     use HasFactory;
    protected $model = Eleves::class;
    public function definition(): array
    {
        return [
            'nomEl' => $this->faker->lastName,
            'prenomEl' => $this->faker->firstName,
            'date_naissance' => $this->faker->date(),
            'sexe' => $this->faker->randomElement(['M', 'F']),
            'archived_at' => null,
            'transports_scolaire_id' => Transports_Scolaires::factory(), // Crée une nouvelle instance de TransportScolaire
            'classe_id' => Classes::factory(), // Crée une nouvelle instance de Classe
            // 'dossier_medicaux_id' => Dossiers_Medicaux::factory(), // Crée une nouvelle instance de DossierMedical
            'parent_id' => Parents::factory(), // Crée une nouvelle instance de Parent
        ];
    }
}
