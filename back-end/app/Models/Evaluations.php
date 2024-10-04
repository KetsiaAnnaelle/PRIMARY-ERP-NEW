<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluations extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomEval', 'description', 'date', 'matiere_id', 'classe_id',  'enseignant_id'
    ];

    public function matiere()
    {
        return $this->belongsTo(Matières::class, 'matiere_id');
    }

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignants::class, 'enseignant_id');
    }

    public function resultats()
    {
        return $this->hasMany(Résultats::class, 'evaluation_id');
    }
}
