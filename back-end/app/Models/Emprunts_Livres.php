<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprunts_Livres extends Model
{
    use HasFactory;

    protected $fillable = [
        'livre_id', 'eleve_id', 'date_emprunt', 'date_retour'
    ];

    public function livre()
    {
        return $this->belongsTo(Bibliothèque::class, 'livre_id');
    }

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }
}
