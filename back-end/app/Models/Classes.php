<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Classes extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomCl', 'section', 'année_scolaire_id',
        'enseignant_id', 'archived_at'
    ];


    public function anneeScolaire(): BelongsTo
    {
        return $this->belongsTo(Années_Scolaires::class,'année_scolaire_id');
    }

    public function eleves()
    {
        return $this->hasMany(Eleves::class, 'classe_id');
    }

    public function cours()
    {
        return $this->belongsToMany(Cours::class,'cours_classes');
    }

    public function matiere()
    {
        return $this->belongsToMany(Matières::class,'matières_classes');
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignants::class, 'enseignant_id');
    }

    public function projets()
    {
        return $this->hasMany(Projets::class, 'classe_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluations::class, 'classe_id');
    }

    public function emploisTemps()
    {
        return $this->hasMany(Emploi_Temps::class, 'classe_id');
    }
}
