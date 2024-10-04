<?php

namespace Database\Factories;

use App\Models\Enseignants;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EnseignantsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    use HasFactory;
    protected $model = Enseignants::class;
    public function definition(): array
    {
        return [
            'nomEns' => $this->faker->lastName,
            'prenomEns' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'telephone' => $this->faker->phoneNumber,
            'adresse' => $this->faker->address,
            'salaire' => $this->faker->numberBetween(100000, 500000), // Salaire aléatoire entre 100000 et 500000
            'type_contrat' => $this->faker->randomElement(['CDI', 'CDD', 'Freelance']), // Type de contrat aléatoire
            'debut_contrat' => $this->faker->date(),
            'fin_contrat' => $this->faker->date(),

        ];
    }
}
