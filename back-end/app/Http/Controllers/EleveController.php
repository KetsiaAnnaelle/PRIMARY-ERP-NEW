<?php

namespace App\Http\Controllers;

use App\Models\Eleves;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     */


     public function index()
     {
         $eleves = Eleves::with(['classe', 'parents', 'transports', 'notes', 'factures']) // Assurez-vous que ces relations sont définies dans le modèle Eleve
             ->whereNull('archived_at')
            //  ->orderBy('created_at', 'desc')
             ->get();

         return response()->json($eleves);
     }


    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'sexe' => 'required|string',
            'birthday' => 'required|date|before:today',
            'classeId' => 'required|integer|exists:classes,id',
            // 'medicalId' => 'nullable|integer|exists:dossiers_medicaux,id',
            'parentId' => 'required|integer|exists:parents,id',
            'transportId' => 'nullable|integer|exists:transports_scolaires,id',
        ]);

        try {

            $password = Str::random(8);

            // Convertir la date au format attendu par MySQL
            $validatedData['birthday'] = Carbon::parse($validatedData['birthday'])->format('Y-m-d');

            Eleves::create([

                'nomEl'=>$validatedData['name'],
                'prenomEl'=> $validatedData['surname'],
                'sexe'=> $validatedData['sexe'],
                'date_naissance'=> $validatedData['birthday'],
                'classe_id'=> $validatedData['classeId'],
                // 'dossier_medicaux_id'=> $validatedData['medicalId'],
                'parent_id'=> $validatedData['parentId'],
                'transports_scolaire_id'=> $validatedData['transportId'],
                // 'password' => Hash::make($password),

            ]);

            return response()->json([
                'message'=>'true',
                // 'password' => $password, // Retourner le mot de passe en clair pour l'afficher dans le toast
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message'=>$e
            ]);
        }

    }

    public function show(string $id)
    {
        $student = Eleves::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student);
    }

    public function update(Request $request, string $id)
    {
        $student = Eleves::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validatedData = $request->validate([
           'name' => 'sometimes|string|max:255',
            'surname' => 'sometimes|string|max:255',
            'birthday' => 'sometimes|date|before:today',
            'classeId' => 'sometimes|integer|exists:classes,id',
            'sexe' => 'sometimes|string',
            'parentId' => 'sometimes|integer|exists:parents,id',
            // 'transportId' => 'nullable|integer|exists:transports_scolaires,id',
        ]);

        $student->update($validatedData);

        return response()->json($student);
    }

     public function Delete(string $id)
     {
        $deleted = DB::table('eleves')->where('id', $id)->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Étudiant supprimé définitivement avec succès',
            ]);
        } else {
            return response()->json([
                'message' => 'Étudiant introuvable',
            ], 404);
        }
     }


    public function archive(string $id)

    {


        $Eleve = Eleves::find($id);
        $Eleve ->update([
             'archived_at'=>now()
        ]);

        return response()->json(['message'=>now()]);

    }





     public function AfficherLesElevesArchivés (){
         $Eleve = DB::table('Eleves')
             ->join('formations', 'formations.id', '=', 'Eleves.formation_id')
             ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'Eleves.Etudiant_id')
             ->select('Eleves.id',
             'Eleves.RefEleve',
             'Eleves.MontantEleve',
             'Eleves.MoyenEleve',
             'Eleves.MotifEleve',
             'Eleves.ProchainEleve',
             'Eleves.Etudiant_id',
             'Eleves.formation_id',
             'inscription_etudiants.nomEtud',
             'formations.nomForm',
             'Eleves.created_at',
             'Eleves.deleted_at',
             'Eleves.archived_at',
             'formations.nomForm')


         ->whereNotNull('Eleves.archived_at')
         ->orderBy('Eleves.created_at','desc')
         ->get();

         // $Eleve = Eleve::whereNotNull('archived_at')->get();

         return response()->json($Eleve);
     }

     public function RestaurerEleveArchivé(string $id){

         $Eleve = Eleves::find($id);


         if (!$Eleve) {
             return response()->json([
                 'message'=>'Etudiant non trouvé'
             ]);
         }

         // $etudiant->formation->nomForm;
         //Reinitialiser la colonne archived_at pour restaurer l'etudiant
         $Eleve->update([
             'archived_at'=>null
         ]);

         return response()->json([
             'message'=>'Etudiant restauré avec succès',
             $Eleve
         ]);
     }
}
