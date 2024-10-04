<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dépenses extends Model
{
    use HasFactory;

    protected $fillable = [
        'montant', 'description', 'date'
    ];
}
