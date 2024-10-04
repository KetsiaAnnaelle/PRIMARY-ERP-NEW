<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projets extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomPro', 'description', 'date_debut', 'date_fin', 'classe_id', 'matiere_id', 'enseignant_id'
    ];

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matières::class, 'matiere_id');
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignants::class, 'enseignant_id');
    }

    public function participants()
    {
        return $this->belongsToMany(Eleves::class, 'participants_projets', 'projet_id', 'eleve_id');
                    // ->withPivot('role');
    }
}
