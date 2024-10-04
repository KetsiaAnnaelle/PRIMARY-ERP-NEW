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
        Schema::create('progrès__académiques', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('statut');

            $table->unsignedBigInteger('eleve_id');
            $table->foreign('eleve_id')
                ->references('id')->on('eleves')
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
        Schema::dropIfExists('progrès__académiques');
    }
};
