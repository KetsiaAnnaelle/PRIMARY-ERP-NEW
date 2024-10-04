<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomPar', 'prenomPar', 'email', 'telephone', 'adresse', 'profession',
        // 'password'
    ];

    public function eleves()
    {
        return $this->hasMany(Eleves::class, 'parent_id');
    }
}
