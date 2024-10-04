<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formations extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomForm', 'description', 'date_debut', 'date_fin'
    ];

    public function participations()
    {
        return $this->hasMany(Participation_Formations::class, 'formation_id');
    }
}
