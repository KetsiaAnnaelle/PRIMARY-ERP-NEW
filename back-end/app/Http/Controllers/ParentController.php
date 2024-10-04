<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Méthode pour créer un nouveau parent
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomPar' => 'required|string|max:255',
            'prenomPar' => 'required|string|max:255',
            'email' => 'sometimes|email|unique:parents,email',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
            'profession' => 'sometimes|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $parent = Parents::create([
            'nomPar' => $request->input('nomPar'),
            'prenomPar' => $request->input('prenomPar'),
            'email' => $request->input('email'),
            'telephone' => $request->input('telephone'),
            'adresse' => $request->input('adresse'),
            'profession' => $request->input('profession'),
        ]);

        return response()->json(['parent' => $parent], 201);
    }

    // Méthode pour récupérer tous les parents
    public function index()
    {
        $parents = Parents::all();
        return response()->json(['parents' => $parents]);
    }

    // Méthode pour récupérer un parent spécifique
    public function show($id)
    {
        $parent = Parents::find($id);

        if (!$parent) {
            return response()->json(['message' => 'Parent not found'], 404);
        }

        return response()->json(['parent' => $parent]);
    }

    // Méthode pour mettre à jour un parent spécifique
    public function update(Request $request, $id)
    {
        $parent = Parents::find($id);

        if (!$parent) {
            return response()->json(['message' => 'Parent not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nomPar' => 'sometimes|string|max:255',
            'prenomPar' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:parents,email,' . $id,
            'telephone' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|required|string|max:255',
            'profession' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $parent->update($request->all());

        return response()->json(['parent' => $parent]);
    }

    // Méthode pour supprimer un parent spécifique
    public function destroy($id)
    {
        $parent = Parents::find($id);

        if (!$parent) {
            return response()->json(['message' => 'Parent not found'], 404);
        }

        $parent->delete();

        return response()->json(['message' => 'Parent deleted successfully']);
    }
}
