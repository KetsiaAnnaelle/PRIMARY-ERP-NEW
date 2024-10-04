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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('statut');

            $table->unsignedBigInteger('eleve_id');
            $table->foreign('eleve_id')
                ->references('id')->on('eleves')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

                $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')
                ->references('id')->on('classes')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps(); //date_inscription ou created_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
