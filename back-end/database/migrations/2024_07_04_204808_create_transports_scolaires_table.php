<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transports_scolaires', function (Blueprint $table) {
            $table->id();
            $table->string('itineraire');
            $table->string('nom_chauffeur');
            $table->string('Tel_Chauffeur');
            $table->string('quartier_Chauffeur');
            $table->time('heure_depart');
            $table->time('heure_arrivee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transports__scolaires');
    }
};
