<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\CssSelector\XPath\Extension\NodeExtension;

class Eleves extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomEl', 'prenomEl', 'sexe', 'archived_at', 'date_naissance', 'classe_id', 'parent_id','transport_scolaire_id','archived_at'
        // 'password'
    ];

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }



    public function parents()
    {
        return $this->belongsTo(Parents::class, 'parent_id');
                    // ->withPivot('relation');
    }

    public function transports()
    {
        return $this->belongsTo(Transports_Scolaires::class, 'transport_scolaire_id');
    }

    public function projets()
    {
        return $this->belongsToMany(Projets::class, 'participants_projets', 'eleve_id', 'projet_id');
                    // ->withPivot('role');
    }

    public function resultats()
    {
        return $this->hasMany(Résultats::class, 'eleve_id');
    }

    public function presences()
    {
        return $this->hasMany(Présences::class, 'eleve_id');
    }

    public function notes()
    {
        return $this->hasMany(Notes::class, 'eleve_id');
    }

    public function incidentsDisciplinaires()
    {
        return $this->hasMany(Incidents_Disciplinaires::class, 'eleve_id');
    }

    public function factures()
    {
        return $this->hasMany(Factures::class, 'eleve_id');
    }

    public function empruntsLivres()
    {
        return $this->hasMany(Emprunts_Livres::class, 'eleve_id');
    }

    public function progressAcademiques()
    {
        return $this->hasMany(Progrès_Académiques::class, 'eleve_id');
    }

    public function incidentsSante()
    {
        return $this->hasMany(Incidents_Santé::class, 'eleve_id');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscriptions::class, 'eleve_id');
    }

}
