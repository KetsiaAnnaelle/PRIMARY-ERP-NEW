<?php

namespace Database\Factories;

use App\Models\Parents;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ParentsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Parents::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nomPar' => $this->faker->lastName,
            'prenomPar' => $this->faker->firstName,
            'email' => $this->faker->unique()->safeEmail,
            'telephone' => $this->faker->phoneNumber,
            'adresse' => $this->faker->address,
            'profession' => $this->faker->jobTitle,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
