<?php

namespace Database\Factories;

use App\Models\Ecole;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ecole>
 */
class EcoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     use HasFactory;
    protected $model = Ecole::class;
    public function definition(): array
    {
        return [
            'nomEc' => $this->faker->company,
            'adresse' => $this->faker->address,
            'contact' => $this->faker->phoneNumber,
        ];
    }
}
