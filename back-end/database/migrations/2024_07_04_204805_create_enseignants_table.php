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
        Schema::create('enseignants', function (Blueprint $table) {
            $table->id();
            $table->string('nomEns');
            $table->string('prenomEns');
            $table->string('email');
            $table->string('telephone');
            $table->string('adresse');
            $table->bigInteger('salaire');
            $table->string('type_contrat');
            $table->date('debut_contrat');
            $table->date('fin_contrat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enseignants');
    }
};
