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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('nomCl');
            $table->string('section');

            $table->unsignedBigInteger('année_scolaire_id');

            $table->foreign('année_scolaire_id')
            ->references('id')->on('années_scolaires')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->unsignedBigInteger('année_scolaire_id');

            $table->foreign('enseignant_id')
            ->references('id')->on('enseignants')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->string('archived_at')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
