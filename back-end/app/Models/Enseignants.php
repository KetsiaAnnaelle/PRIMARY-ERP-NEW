<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignants extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomEns', 'prenomEns', 'email', 'telephone', 'adresse', 'salaire', 'type_contrat', 'debut_contrat', 'fin_contrat',
        // 'password'
    ];

    public function cours()
    {
        return $this->belongsToMany(Cours::class, 'cours_enseignants');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluations::class, 'enseignant_id');
    }

    public function projets()
    {
        return $this->hasMany(Projets::class, 'enseignant_id');
    }

    public function participationsFormations()
    {
        return $this->hasMany(Participation_Formations::class, 'enseignant_id');
    }

    public function emploisTemps()
    {
        return $this->hasMany(Emploi_Temps::class, 'enseignant_id');
    }
}
