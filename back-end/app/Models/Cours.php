<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomCours', 'debut', 'fin', 'duree', 'description', 'matiere_id',
        //  'classe_id', 'enseignant_id'
    ];

    public function matiere(): BelongsTo
    {
        return $this->belongsTo(Matières::class,'matiere_id');
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'cours_classes');
    }

    public function enseignants()
    {
        return $this->belongsToMany(Enseignants::class, 'cours_enseignants');
    }


    public function emploisTemps()
    {
        return $this->hasMany(Emploi_Temps::class, 'cours_id');
    }

}
