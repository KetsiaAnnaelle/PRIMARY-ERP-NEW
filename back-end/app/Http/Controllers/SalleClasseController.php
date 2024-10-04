<?php

namespace App\Http\Controllers;

use App\Models\SalleClasse;
use App\Models\Salles_Classe;
use Illuminate\Http\Request;

class SalleClasseController extends Controller
{
    /**
     * Affiche la liste de toutes les salles de classes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $salles = Salles_Classe::all();
        return response()->json($salles);
    }

    /**
     * Affiche les détails d'une salle de classe spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salle = Salles_Classe::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Salle de classe non trouvée'], 404);
        }

        return response()->json($salle);
    }

    /**
     * Crée une nouvelle salle de classe.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'capacité' => 'required|integer',
            'equipements_disponibles' => 'required|string',
        ]);

        $salle = Salles_Classe::create($validated);

        return response()->json($salle, 201);
    }

    /**
     * Met à jour les informations d'une salle de classe.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $salle = Salles_Classe::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Salle de classe non trouvée'], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|string',
            'capacité' => 'sometimes|integer',
            'equipements_disponibles' => 'sometimes|string',
        ]);

        $salle->update($validated);

        return response()->json($salle);
    }

    /**
     * Supprime une salle de classe.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $salle = Salles_Classe::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Salle de classe non trouvée'], 404);
        }

        $salle->delete();

        return response()->json(['message' => 'Salle de classe supprimée avec succès']);
    }
}

