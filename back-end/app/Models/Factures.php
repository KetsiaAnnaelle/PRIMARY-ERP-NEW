<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factures extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id', 'classe_id','montant', 'date_emission', 'date_paiement'
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleves::class, 'eleve_id');
    }

    // Si Factures a une relation avec Classes, ajouter cette méthode
    public function classe()
    {
        return $this->belongsTo(Classes::class, 'classe_id');
    }
}
