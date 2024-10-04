<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bibliothèque extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'auteur',
        'genre',
        'etat'
    ];

    public function emprunts()
    {
        return $this->hasMany(Emprunts_Livres::class, 'livre_id');
    }
}
