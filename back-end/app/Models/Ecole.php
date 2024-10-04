<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    use HasFactory;

    protected $table = 'ecole'; // Assurez-vous que c'est le bon nom de table

    protected $fillable = [
        'nomEc', 'adresse', 'contact',
    ];

    public function anneesScolaires()
    {
        return $this->hasMany(Années_Scolaires::class, 'ecole_id');
    }


}
