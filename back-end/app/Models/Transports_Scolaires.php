<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transports_Scolaires extends Model
{
    use HasFactory;

    protected $table = 'transports_scolaires';

    protected $fillable = [
        'itineraire', 'heure_depart', 'heure_arrivee', 'nom_chauffeur', 'Tel_Chauffeur', 'quartier_Chauffeur'
    ];

    public function eleves()
    {
        return $this->hasMany(Eleves::class, 'transport_scolaire_id');
    }
}
