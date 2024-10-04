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
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->string('nomEval');
            $table->longText('description');
            $table->date('date');

            $table->unsignedBigInteger('matiere_id');
            $table->foreign('matiere_id')
                ->references('id')->on('matières')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')
                ->references('id')->on('classes')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('enseignant_id');
            $table->foreign('enseignant_id')
                ->references('id')->on('enseignants')
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
        Schema::dropIfExists('évaluations');
    }
};
