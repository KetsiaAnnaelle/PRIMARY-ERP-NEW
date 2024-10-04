<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Résultats extends Model
{
    use HasFactory;

    protected $fillable = [
        'evaluation_id', 'eleve_id', 'note', 'commentaire'
    ];

    public function evaluation()
    {
        return $this->belongsTo(Evaluations::class, 'evaluation_id');
    }

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }
}
