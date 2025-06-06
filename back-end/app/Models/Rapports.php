<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rapports extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'type', 'description', 'date_generation'
    ];
}
