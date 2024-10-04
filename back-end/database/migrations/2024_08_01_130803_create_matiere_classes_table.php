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
        Schema::create('matiere_classes', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('matiere_id');
            $table->foreign('matiere_id')
                ->references('id')->on('matières')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')
                ->references('id')->on('classes')
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
        Schema::dropIfExists('matiere_classes');
    }
};
