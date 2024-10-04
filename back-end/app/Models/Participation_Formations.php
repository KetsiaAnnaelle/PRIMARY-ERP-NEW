<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participation_Formations extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id', 'enseignant_id', 'resultat', 'certification_obtenue'
    ];

    public function formation()
    {
        return $this->belongsTo(Formations::class, 'formation_id');
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignants::class, 'enseignant_id');
    }
}
