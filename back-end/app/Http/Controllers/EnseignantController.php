<?php

namespace App\Http\Controllers;

use App\Models\Enseignants;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enseignants = Enseignants::all();
        return response()->json($enseignants);
    }

    /**
     * Affiche les détails d'un enseignant spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $enseignant = Enseignants::find($id);

        if (!$enseignant) {
            return response()->json(['message' => 'Enseignant non trouvé'], 404);
        }

        return response()->json($enseignant);
    }

    /**
     * Crée un nouvel enseignant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomEns' => 'required|string|max:255',
            'prenomEns' => 'required|string|max:255',
            'email' => 'required|email|unique:enseignants,email',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
            'salaire' => 'required|numeric',
            'type_contrat' => 'required|string|max:255',
            'debut_contrat' => 'required|date',
            'fin_contrat' => 'required|date|after:debut_contrat',
        ]);

        $enseignant = Enseignants::create($validated);

        return response()->json($enseignant, 201);
    }

    /**
     * Met à jour les informations d'un enseignant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $enseignant = Enseignants::find($id);

        if (!$enseignant) {
            return response()->json(['message' => 'Enseignant non trouvé'], 404);
        }

        $validated = $request->validate([
            'nomEns' => 'sometimes|string|max:255',
            'prenomEns' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:enseignants,email,' . $id,
            'telephone' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|string|max:255',
            'salaire' => 'sometimes|numeric',
            'type_contrat' => 'sometimes|string|max:255',
            'debut_contrat' => 'sometimes|date',
            'fin_contrat' => 'sometimes|date|after:debut_contrat',
        ]);

        $enseignant->update($validated);

        return response()->json($enseignant);
    }

    /**
     * Supprime un enseignant.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $enseignant = Enseignants::find($id);

        if (!$enseignant) {
            return response()->json(['message' => 'Enseignant non trouvé'], 404);
        }

        $enseignant->delete();

        return response()->json(['message' => 'Enseignant supprimé avec succès']);
    }
}
