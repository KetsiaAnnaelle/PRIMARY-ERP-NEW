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
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('montant');
            $table->date('date_emission');
            $table->date('date_paiement');

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
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
