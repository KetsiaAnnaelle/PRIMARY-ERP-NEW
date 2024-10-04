<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salles_Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',  'capacité',  'equipements_disponibles'
    ];
}
