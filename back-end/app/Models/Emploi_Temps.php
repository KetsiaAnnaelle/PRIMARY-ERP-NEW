<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emploi_Temps extends Model
{
    use HasFactory;

    protected $fillable = [
        'classe_id', 'cours_id', 'jour', 'heure_debut', 'heure_fin', 'enseignant_id', 'salle_id'
    ];

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class, 'cours_id');
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignants::class, 'enseignant_id');
    }

    public function salle()
    {
        return $this->belongsTo(Salles_Classe::class, 'salle_id');
    }
}
