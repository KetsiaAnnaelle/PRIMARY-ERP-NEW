<?php

namespace Database\Seeders;

use App\Models\Années_Scolaires;
use App\Models\Classes;
use App\Models\Cours;
use App\Models\Ecole;
use App\Models\Eleves;
use App\Models\Enseignants;
use App\Models\Matières;
use App\Models\Parents;
use App\Models\Transports_Scolaires;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => Hash::make('adminApp'),
        //     'role' => 'admin'
        // ]);

         // Création d'exemples de données
         Ecole::factory(1)->create(); // Crée une école
         Années_Scolaires::factory(2)->create(); // Crée deux années scolaires
         Classes::factory(5)->create(); // Crée cinq classes
        //  Projet::factory(10)->create(); // Crée dix projets
         Cours::factory(15)->create(); // Crée quinze cours
        //  Dossiers_Medicaux::factory(10)->create(); // Crée dix dossiers médicaux
         Eleves::factory(50)->create(); // Crée cinquante élèves
         Enseignants::factory(10)->create(); // Crée dix enseignants
         Matières::factory(8)->create(); // Crée huit matières
         Parents::factory(50)->create(); // Crée cinquante parents
         Transports_Scolaires::factory(5)->create(); // Crée cinq transports scolaires
    }
}
