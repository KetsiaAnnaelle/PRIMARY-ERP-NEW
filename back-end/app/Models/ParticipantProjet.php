<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantProjet extends Model
{
    use HasFactory;

    protected $table = 'participants_projets';
    protected $fillable = ['projet_id', 'eleve_id', 'role'];

    public function projet()
    {
        return $this->belongsTo(Projets::class, 'projet_id');
    }

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }
}
