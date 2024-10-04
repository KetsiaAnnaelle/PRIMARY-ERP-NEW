<?php

namespace App\Http\Controllers;

use App\Models\Matières;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatiereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Matières::all();
        return response()->json($notes);
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
        $validator = Validator::make($request->all(), [
            'nomMat' => 'required|string|max:255|unique:matières,nomMat',
            'coef' => 'nullable|numeric|min:0', // coef est facultatif
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $matiere = Matières::create([
            'nomMat' => $request->input('nomMat'),
            'coef' => $request->input('coef', 1), // Utiliser la valeur par défaut 1 si coef n'est pas fourni et coef est facultatif
        ]);

        return response()->json(['matiere' => $matiere], 201);
    }


    // Méthode pour supprimer une matière spécifique
    public function destroy($id)
    {
        $matiere = Matières::find($id);

        if (!$matiere) {
            return response()->json(['message' => 'Matière not found'], 404);
        }

        $matiere->delete();

        return response()->json(['messaPge' => 'Matière deleted successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $matiere = Matières::find($id);

        if (!$matiere) {
            return response()->json(['message' => 'Matière not found'], 404);
        }

        return response()->json(['matiere' => $matiere]);
    }

    public function update(Request $request, $id)
{
    $matiere = Matières::find($id);

    if (!$matiere) {
        return response()->json(['message' => 'Matière not found'], 404);
    }

    $validator = Validator::make($request->all(), [
        'nomMat' => 'sometimes|required|string|max:255|unique:matières,nomMat,' . $id,
        'coef' => 'sometimes|required|numeric|min:0', // Validation pour coef
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $matiere->update($request->all());

    return response()->json(['matiere' => $matiere]);
}


    /**
     * Show the form for editing the specified resource.
     */

}
