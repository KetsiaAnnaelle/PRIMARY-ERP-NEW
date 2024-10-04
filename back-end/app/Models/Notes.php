<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'matière_id', 'note', 'évaluation_id', 'projet_id'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matières::class, 'matière_id');
    }

    public function evaluation()
    {
        return $this->belongsTo(Evaluations::class, 'évaluation_id');
    }


    public function projet()
    {
        return $this->belongsTo(Projets::class, 'projet_id');
    }
}
