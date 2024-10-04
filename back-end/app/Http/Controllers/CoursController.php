<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;

class CoursController extends Controller
{
    /**
     * Affiche la liste de tous les cours.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cours = Cours::all();
        return response()->json($cours);
    }

    /**
     * Affiche les détails d'un cours spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cours = Cours::find($id);

        if (!$cours) {
            return response()->json(['message' => 'Cours non trouvé'], 404);
        }

        return response()->json($cours);
    }

    /**
     * Crée un nouveau cours.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomCours' => 'required|string',
            'description' => 'required|string',
            'debut' => 'required|date_format:H:i',
            'fin' => 'required|date_format:H:i',
            'duree' => 'required|integer',
            'matiere_id' => 'required|exists:matières,id',
        ]);

        $cours = Cours::create($validated);

        return response()->json($cours, 201);
    }

    /**
     * Met à jour les informations d'un cours.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cours = Cours::find($id);

        if (!$cours) {
            return response()->json(['message' => 'Cours non trouvé'], 404);
        }

        $validated = $request->validate([
            'nomCours' => 'required|string',
            'description' => 'sometimes|string',
            'debut' => 'sometimes|date_format:H:i',
            'fin' => 'sometimes|date_format:H:i',
            'duree' => 'sometimes|integer',
            'matiere_id' => 'required|exists:matières,id',
        ]);

        $cours->update($validated);

        return response()->json($cours);
    }

    /**
     * Supprime un cours.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cours = Cours::find($id);

        if (!$cours) {
            return response()->json(['message' => 'Cours non trouvé'], 404);
        }

        $cours->delete();

        return response()->json(['message' => 'Cours supprimé avec succès']);
    }
}
