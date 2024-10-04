<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoursEnseignant extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_id', 'enseignant_id',
    ];

    public function cours(): BelongsTo
    {
        return $this->belongsTo(Cours::class,'cours_id');
    }

    public function enseignant(): BelongsTo
    {
        return $this->belongsTo(Classes::class,'enseignant_id');
    }
}
