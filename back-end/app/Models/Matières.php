<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Matières extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomMat',
        'coef'
        // 'classe_id'
    ];

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'matiere_classes');
    }

    public function cours(): HasMany
    {
        return $this->hasMany(Cours::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluations::class, 'matiere_id');
    }

    public function notes()
    {
        return $this->hasMany(Notes::class, 'matiere_id');
    }

    public function progressAcademiques()
    {
        return $this->hasMany(Progrès_Académiques::class, 'matiere_id');
    }

    public function projets()
    {
        return $this->hasMany(Projets::class, 'matiere_id');
    }
}
