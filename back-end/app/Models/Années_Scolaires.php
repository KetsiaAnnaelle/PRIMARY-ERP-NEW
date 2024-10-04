<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Années_Scolaires extends Model
{
    use HasFactory;

    protected $table = 'années_scolaires'; // Assurez-vous que le nom de la table est correct
    protected $fillable = [
        'annee_debut',
        'annee_fin',
        'trimestre',
        'date_debut',
        'date_fin',
        // 'ecole_id'
    ];

    public function ecole()
    {
        return $this->belongsTo(Ecole::class, 'ecole_id');
    }

    public function classes()
    {
        return $this->hasMany(Classes::class, 'annee_id');
    }
}
