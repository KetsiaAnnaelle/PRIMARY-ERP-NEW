<?php

namespace App\Http\Controllers;
use App\Models\Classes;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Affiche la liste de toutes les classes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classes = Classes::with('anneeScolaire', 'enseignant')
                            ->whereNull('archived_at')
                            ->get();
        return response()->json($classes);
    }

    /**
     * Affiche les détails d'une classe spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $classe = $classes = Classes::with('anneeScolaire', 'enseignant')
        // ->whereNull('archived_at')
        ->find($id);

        if (!$classe) {
            return response()->json(['message' => 'Classe non trouvée'], 404);
        }

        return response()->json($classe);
    }

    /**
     * Crée une nouvelle classe.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
  public function store(Request $request)
    {
    // Validation des données entrantes
    $validated = $request->validate([
        'nomCl' => 'required|string|max:255',
        'section' => 'required|string|in:Francophone,Anglophone',
        'année_scolaire_id' => 'required|exists:années_scolaires,id',
        'enseignant_id' => 'required|exists:enseignants,id',
    ]);

    try {
        // Création de la nouvelle classe
        $classe = Classes::create([
            'nomCl' => $validated['nomCl'],
            'section' => $validated['section'],
            'année_scolaire_id' => $validated['année_scolaire_id'],
            'enseignant_id' => $validated['enseignant_id'],
        ]);

        return response()->json([
            'message' => 'Classe créée avec succès',
            'data' => $classe,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la création de la classe',
            'error' => $e->getMessage(),
        ], 500);
    }
}



    /**
     * Met à jour les informations d'une classe.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $classe = Classes::find($id);

        if (!$classe) {
            return response()->json(['message' => 'Classe non trouvée'], 404);
        }

        $validated = $request->validate([
            'nomCl' => 'sometimes|string',
            'section' => 'sometimes|string',
            'années_scolaire_id' => 'sometimes|exists:années_scolaires,id',
            'enseignant_id' => 'sometimes|exists:enseignants,id',
        ]);

        $classe->update($validated);

        return response()->json($classe);
    }

    /**
     * Supprime une classe.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $classe = Classes::find($id);

        if (!$classe) {
            return response()->json(['message' => 'Classe non trouvée'], 404);
        }

        $classe->delete();

        return response()->json(['message' => 'Classe supprimée avec succès']);
    }

    public function archive(string $id)
    {
        $classe = Classes::find($id);
        $classe ->update([
            'archived_at'=>now()
        ]);

        return response()->json(['message'=>now()]);

    }

    // public function AfficherLesclassesArchivés (){
    //     //  $classes = DB::table('inscription_classes')
    //     ->join('formations', 'formations.id', '=', 'inscription_classes.formation_id')
    //     // ->join('inscription_classes', 'inscription_classes.id', '=', 'paiements.classe_id')


    //     ->whereNotNull('archived_at')
    //     ->orderBy('created_at','desc')
    //     ->get();

    //     return response()->json($classes);
    // }

    // public function RestaurerclasseArchivé(string $id){

    //     $classe = Classes::find($id);

    //     if (!$classe) {
    //         return response()->json([
    //             'message'=>'classe non trouvé'
    //         ]);
    //     }

    //     // $classe->formation->nomForm;
    //     //Reinitialiser la colonne archived_at pour restaurer l'classe
    //     $classe->update([
    //         'archived_at'=>null
    //     ]);

    //     return response()->json([
    //         'message'=>'classe restauré avec succès',
    //         $classe
    //     ]);
    // }
}
