<?php

namespace App\Http\Controllers;

use App\Models\Ecole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EcoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $school = \App\Models\Ecole::first(); // Assurez-vous de récupérer correctement une seule instance
        return $school;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nomEc' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'contact' => 'required|string',
        ]);

        // dd($validatedData);

        try {
            $ecole = Ecole::create([
                'nomEc' => $validatedData['nomEc'],
                'adresse' => $validatedData['adresse'],
                'contact' => $validatedData['contact'],
            ]);

            return response()->json([
                'message' => 'École créée avec succès',
                'ecole' => $ecole
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => "Oupps!!! Une erreur s'est produite",
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(), // Ajoute ceci pour plus de détails
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ecole = Ecole::find($id);

        if (!$ecole) {
            return response()->json(['message' => 'ecole not found'], 404);
        }

        $validatedData = $request->validate([
            'nomEc' => 'sometimes|required|string|max:255',
            'adresse'  => 'sometimes|required|string|max:255',
            'conatact'  => 'sometimes|required|string',
        ]);

        $ecole->update($validatedData);

        return response()->json($ecole);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = DB::table('ecole')->where('id', $id)->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'ecole supprimé définitivement avec succès',
            ]);
        } else {
            return response()->json([
                'message' => 'Ecole introuvable',
            ], 404);
        }
    }
}
