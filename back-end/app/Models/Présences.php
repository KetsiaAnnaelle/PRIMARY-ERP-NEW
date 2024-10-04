<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Présences extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'date', 'statut'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }
}
