<?php

namespace Database\Factories;

use App\Models\Cours;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cours>
 */
class CoursFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    use HasFactory;

    protected $model = Cours::class;
    public function definition(): array
    {
        return [
            'nomCours' => $this->faker->word,
            'description' => $this->faker->sentence,
            'debut' => $this->faker->time,
            'fin' => $this->faker->time,
            'duree' => $this->faker->numberBetween(30, 180), // Durée en minutes
            'matiere_id' => \App\Models\Matières::factory(), // Factory pour la matière
        ];
    }
}
