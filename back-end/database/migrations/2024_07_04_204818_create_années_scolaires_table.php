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
        Schema::create('années_scolaires', function (Blueprint $table) {
            $table->id();
            $table->date('annee_debut');
            $table->date('annee_fin');
            $table->string('trimestre');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->unsignedBigInteger('ecole_id')->nullable();

            $table->foreign('ecole_id')
                  ->references('id')->on('ecole')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('années_scolaires');
    }
};
