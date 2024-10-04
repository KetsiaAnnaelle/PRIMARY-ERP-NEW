<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'salle_id', 'description',
        // 'date_signalement', je ne comprends pas ce que ca veut dire
         'date_reparation'
    ];

    public function salle()
    {
        return $this->belongsTo(Salles_Classe::class, 'salle_id');
    }

}
