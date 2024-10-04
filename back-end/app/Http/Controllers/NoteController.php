<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Notes;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Affiche la liste de toutes les notes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notes = Notes::with(['eleve', 'matiere', 'evaluation', 'projet'])->get();
        return response()->json($notes);
    }

    /**
     * Affiche les détails d'une note spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $note = Notes::with(['eleve', 'matiere', 'evaluation', 'projet'])->find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée'], 404);
        }

        return response()->json($note);
    }

    /**
     * Crée une nouvelle note.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'note' => 'required|integer',
                'eleve_id' => 'required|exists:eleves,id',
                'matière_id' => 'required|exists:matières,id',
                // 'evaluation_id' => 'nullable|exists:évaluations,id',
                // 'projet_id' => 'nullable|exists:projets,id',
            ]);

            $note = Notes::create([
                'note' => $validatedData['note'],
                'eleve_id' => $validatedData['eleve_id'],
                'matière_id' => $validatedData['matière_id'],
                'evaluation_id' => $validatedData['evaluation_id'] ?? null,
                'projet_id' => $validatedData['projet_id'] ?? null,
            ]);

            return response()->json($note, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Met à jour les informations d'une note.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $note = Notes::find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée'], 404);
        }

        $validated = $request->validate([
            'note' => 'sometimes|integer',
            'eleve_id' => 'sometimes|exists:eleves,id',
            'matière_id' => 'sometimes|exists:matières,id',
            'evaluation_id' => 'sometimes|exists:évaluations,id',
            'projet_id' => 'sometimes|exists:projets,id',
        ]);

        $note->update($validated);

        return response()->json($note);
    }

    /**
     * Supprime une note.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $note = Notes::find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée'], 404);
        }

        $note->delete();

        return response()->json(['message' => 'Note supprimée avec succès']);
    }
}
