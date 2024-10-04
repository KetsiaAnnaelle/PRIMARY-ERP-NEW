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
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->string('nomCours');
            $table->string('description');
            $table->time('debut');
            $table->time('fin');
            $table->integer('duree');

            $table->unsignedBigInteger('matiere_id');
            $table->foreign('matiere_id')
                ->references('id')->on('matières')
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
        Schema::dropIfExists('cours');
    }
};
