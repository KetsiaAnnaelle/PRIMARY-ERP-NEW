<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidents_Santé extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'date', 'description', 'action_prises'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }
}
