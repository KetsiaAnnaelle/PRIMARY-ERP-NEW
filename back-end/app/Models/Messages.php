<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = [
    //  'expediteur_id', 'destinataire_id',
        'sujet', 'contenu'
    ];
}
