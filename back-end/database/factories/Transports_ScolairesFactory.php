<?php

namespace Database\Factories;

use App\Models\Transports_Scolaires;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Transports_ScolairesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
        use HasFactory;
     protected $model = Transports_Scolaires::class;
    public function definition(): array
    {
        return [
            'itineraire' => $this->faker->address, // Génère un itinéraire aléatoire
            'nom_chauffeur' => $this->faker->name, // Génère un nom de chauffeur aléatoire
            'Tel_Chauffeur' => $this->faker->phoneNumber, // Génère un numéro de téléphone de chauffeur aléatoire
            'quartier_Chauffeur' => $this->faker->address, // Génère un quartier de chauffeur aléatoire
            'heure_depart' => $this->faker->time('H:i:s'), // Génère une heure de départ aléatoire
            'heure_arrivee' => $this->faker->time('H:i:s'), // Génère une heure d'arrivée aléatoire
        ];
    }
}
