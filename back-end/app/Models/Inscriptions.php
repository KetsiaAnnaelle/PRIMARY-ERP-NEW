<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscriptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'classe_id',  'statut',
        // 'date_inscription' => creatd_at
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }

    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }
}
