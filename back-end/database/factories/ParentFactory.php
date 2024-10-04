<?php

namespace Database\Factories;

use App\Models\Parents;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ParentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    use HasFactory;
     protected $model = Parents::class;
    public function definition(): array
    {
        return [
            'nomPar' => $this->faker->lastName, // Génère un nom de famille aléatoire
            'prenomPar' => $this->faker->firstName, // Génère un prénom aléatoire
            'email' => $this->faker->unique()->safeEmail, // Génère une adresse email unique
            'telephone' => $this->faker->phoneNumber, // Génère un numéro de téléphone aléatoire
            'adresse' => $this->faker->address, // Génère une adresse aléatoire
            'profession' => $this->faker->jobTitle, // Génère un titre de profession aléatoire
        ];
    }
}
