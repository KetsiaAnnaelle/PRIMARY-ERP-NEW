<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoursClasse extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_id', 'classe_id',
        //  'classe_id', 'enseignant_id'
    ];

    public function cours(): BelongsTo
    {
        return $this->belongsTo(Cours::class,'cours_id');
    }

    public function classe(): BelongsTo                                                                                                                                                                         
    {
        return $this->belongsTo(Classes::class,'classe_id');
    }
}
