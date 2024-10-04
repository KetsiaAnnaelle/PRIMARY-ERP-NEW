<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progrès_Académiques extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'classe_id', 'matiere_id', 'note', 'date'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matières::class, 'matiere_id');
    }
}
