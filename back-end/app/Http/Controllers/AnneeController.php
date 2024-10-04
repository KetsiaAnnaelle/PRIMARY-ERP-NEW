<?php

namespace App\Http\Controllers;

use App\Models\Années_Scolaires;
use Illuminate\Http\Request;

class AnneeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anneesScolaires = Années_Scolaires::all();
        return response()->json($anneesScolaires);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'annee_debut' => 'required|date',
            'annee_fin' => 'required|date',
            'trimestre' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            // 'ecole_id' => 'sometimes|exists:ecole,id',
        ]);

        $anneeScolaire = new Années_Scolaires([
            'annee_debut' => $request->input('annee_debut'),
            'annee_fin' => $request->input('annee_fin'),
            'trimestre' => $request->input('trimestre'),
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
            // 'ecole_id' => $request->input('ecole_id'),
        ]);

        $anneeScolaire->save();

        return response()->json($anneeScolaire, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $anneeScolaire = Années_Scolaires::findOrFail($id);
        return response()->json($anneeScolaire);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'annee_debut' => 'required|date',
            'annee_fin' => 'required|date',
            'ecole_id' => 'nullable|exists:ecoles,id',
        ]);

        $anneeScolaire = Années_Scolaires::findOrFail($id);
        $anneeScolaire->annee_debut = $request->get('annee_debut');
        $anneeScolaire->annee_fin = $request->get('annee_fin');
        $anneeScolaire->ecole_id = $request->get('ecole_id');

        $anneeScolaire->save();

        return response()->json($anneeScolaire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $anneeScolaire = Années_Scolaires::findOrFail($id);
        $anneeScolaire->delete();

        return response()->json(null, 204);
    }
}
