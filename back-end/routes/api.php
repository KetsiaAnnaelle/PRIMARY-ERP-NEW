<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AnneeController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\EleveController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\TransportScolaireController;
use App\Http\Controllers\SalleClasseController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\NoteController;


// use App\Http\Controllers\Api\ParentController;
// use App\Http\Controllers\Api\TeacherController;

// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ], function ($router) {
//     // Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/login', [AuthController::class, 'login']);
//     Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
//     Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
//     Route::post('/profile', [AuthController::class, 'profile'])->middleware('auth:api');
// });

Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/create-student', [EleveController::class, 'index']);
Route::post('/create-student', [EleveController::class, 'store']);
Route::get('/student/{id}', [EleveController::class, 'show']);
Route::delete('/delete-student/{id}', [EleveController::class, 'Delete']);
Route::put('/archive-student/{id}', [EleveController::class, 'archive']);
Route::put('/update-student/{id}', [EleveController::class, 'update']);

Route::get('/create-school', [EcoleController::class, 'index']);
Route::post('/create-school', [EcoleController::class, 'store']);
Route::delete('/delete-school/{id}', [EcoleController::class, 'Delete']);
Route::put('/update-school/{id}', [EcoleController::class, 'update']);


Route::prefix('parents')->group(function () {
    Route::post('/', [ParentController::class, 'store']); // Créer un parent
    Route::get('/', [ParentController::class, 'index']); // Récupérer tous les parents
    Route::get('/{id}', [ParentController::class, 'show']); // Récupérer un parent spécifique
    Route::put('/{id}', [ParentController::class, 'update']); // Mettre à jour un parent spécifique
    Route::delete('/{id}', [ParentController::class, 'destroy']); // Supprimer un parent spécifique
});


Route::prefix('matieres')->group(function () {
    Route::post('/', [MatiereController::class, 'store']); // Créer une matière
    Route::get('/', [MatiereController::class, 'index']); // Récupérer toutes les matières
    Route::get('/{id}', [MatiereController::class, 'show']); // Récupérer une matière spécifique
    Route::put('/{id}', [MatiereController::class, 'update']); // Mettre à jour une matière spécifique
    Route::delete('/{id}', [MatiereController::class, 'destroy']); // Supprimer une matière spécifique
});

Route::get('/enseignants', [EnseignantController::class, 'index']);
Route::get('/enseignants/{id}', [EnseignantController::class, 'show']);
Route::post('/enseignants', [EnseignantController::class, 'store']);
Route::put('/enseignants/{id}', [EnseignantController::class, 'update']);
Route::delete('/enseignants/{id}', [EnseignantController::class, 'destroy']);


Route::get('/transports-scolaires', [TransportScolaireController::class, 'index']);
Route::get('/transports-scolaires/{id}', [TransportScolaireController::class, 'show']);
Route::post('/transports-scolaires', [TransportScolaireController::class, 'store']);
Route::put('/transports-scolaires/{id}', [TransportScolaireController::class, 'update']);
Route::delete('/transports-scolaires/{id}', [TransportScolaireController::class, 'destroy']);

Route::get('/salles-classes', [SalleClasseController::class, 'index']);
Route::get('/salles-classes/{id}', [SalleClasseController::class, 'show']);
Route::post('/salles-classes', [SalleClasseController::class, 'store']);
Route::put('/salles-classes/{id}', [SalleClasseController::class, 'update']);
Route::delete('/salles-classes/{id}', [SalleClasseController::class, 'destroy']);



Route::get('/cours', [CoursController::class, 'index']);
Route::get('/cours/{id}', [CoursController::class, 'show']);
Route::post('/cours', [CoursController::class, 'store']);
Route::put('/cours/{id}', [CoursController::class, 'update']);
Route::delete('/cours/{id}', [CoursController::class, 'destroy']);


Route::get('/classes', [ClasseController::class, 'index']);
Route::get('/classes/{id}', [ClasseController::class, 'show']);
Route::post('/classes', [ClasseController::class, 'store']);
Route::put('/classes/{id}', [ClasseController::class, 'update']);
Route::delete('/classes/{id}/delete', [ClasseController::class, 'destroy']);
Route::put('/classes/{id}/archive', [ClasseController::class, 'archive']);


Route::get('/notes', [NoteController::class, 'index']);
Route::get('/notes/{id}', [NoteController::class, 'show']);
Route::post('/notes', [NoteController::class, 'store']);
Route::put('/notes/{id}', [NoteController::class, 'update']);
Route::delete('/notes/{id}', [NoteController::class, 'destroy']);


Route::get('/school-year', [AnneeController::class, 'index']);
// Route::get('/school-year/{id}', [NoteController::class, 'show']);
Route::post('/school-year', [AnneeController::class, 'store']);
// Route::put('/notes/{id}', [NoteController::class, 'update']);
Route::delete('/school-year/{id}', [AnneeController::class, 'destroy']);



// Route::middleware('auth:sanctum')->group(function () {
//     Route::middleware('role:admin')->group(function () {
//         Route::post('/parents', [ParentController::class, 'store']);
//         Route::post('/teachers', [TeacherController::class, 'store']);
//     });
// });


