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
        Schema::create('emploi__temps', function (Blueprint $table) {
            $table->id();
            $table->string('jour');
            $table->time('heure_debut');
            $table->time('heure_fin');

            $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')
                ->references('id')->on('classes')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('cours_id');
            $table->foreign('cours_id')
                ->references('id')->on('cours')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('enseignant_id');
            $table->foreign('enseignant_id')
                ->references('id')->on('enseignants')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('salle_id');
            $table->foreign('salle_id')
                ->references('id')->on('salles_classes')
                ->constrained()
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
        Schema::dropIfExists('emploi__temps');
    }
};
