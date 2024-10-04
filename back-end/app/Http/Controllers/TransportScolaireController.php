<?php

namespace App\Http\Controllers;

use App\Models\Transports_Scolaires;
use App\Models\TransportScolaire;
use Illuminate\Http\Request;

class TransportScolaireController extends Controller
{
    /**
     * Affiche la liste de tous les transports scolaires.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transports = Transports_Scolaires::all();
        return response()->json($transports);
    }

    /**
     * Affiche les détails d'un transport scolaire spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transport = Transports_Scolaires::find($id);

        if (!$transport) {
            return response()->json(['message' => 'Transport scolaire non trouvé'], 404);
        }

        return response()->json($transport);
    }

    /**
     * Crée un nouveau transport scolaire.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'itineraire' => 'required|string',
            'nom_chauffeur' => 'required|string',
            'Tel_Chauffeur' => 'required|string',
            'quartier_Chauffeur' => 'required|string',
            'heure_depart' => 'required|date_format:H:i',
            'heure_arrivee' => 'required|date_format:H:i',
        ]);

        $transport = Transports_Scolaires::create($validated);

        return response()->json($transport, 201);
    }

    /**
     * Met à jour les informations d'un transport scolaire.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $transport = Transports_Scolaires::find($id);

        if (!$transport) {
            return response()->json(['message' => 'Transport scolaire non trouvé'], 404);
        }

        $validated = $request->validate([
            'itineraire' => 'sometimes|string',
            'nom_chauffeur' => 'sometimes|string',
            'Tel_Chauffeur' => 'sometimes|string',
            'quartier_Chauffeur' => 'sometimes|string',
            'heure_depart' => 'sometimes|date_format:H:i',
            'heure_arrivee' => 'sometimes|date_format:H:i',
        ]);

        $transport->update($validated);

        return response()->json($transport);
    }

    /**
     * Supprime un transport scolaire.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transport = Transports_Scolaires::find($id);

        if (!$transport) {
            return response()->json(['message' => 'Transport scolaire non trouvé'], 404);
        }

        $transport->delete();

        return response()->json(['message' => 'Transport scolaire supprimé avec succès']);
    }
}
