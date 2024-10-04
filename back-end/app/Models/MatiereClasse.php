<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MatiereClasse extends Model
{
    use HasFactory;

    protected $fillable = [
        'matiere_id', 'classe_id',
        //  'classe_id', 'enseignant_id'
    ];

    public function matiere(): BelongsTo
    {
        return $this->belongsTo(Matières::class,'matiere_id');
    }

    public function classe(): BelongsTo
    {
        return $this->belongsTo(Classes::class,'classe_id');
    }
}
