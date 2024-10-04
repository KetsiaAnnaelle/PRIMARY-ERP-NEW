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
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
            $table->string('nomEl');
            $table->string('prenomEl');
            // $table->string('password');
            $table->date('date_naissance');
            $table->string('sexe'); // Remplacé de date à string, car sexe ne devrait pas être une date
            $table->date('archived_at')->nullable(); // 'after' enlevé

            $table->unsignedBigInteger('transports_scolaire_id')->nullable();
            $table->foreign('transports_scolaire_id')
                ->references('id')
                ->on('transports_scolaires')
                ->onUpdate('cascade')
                ->onDelete('set null'); // 'set null' pour éviter les conflits

            $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')
                ->references('id')
                ->on('classes')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            // $table->unsignedBigInteger('dossier_medicaux_id');
            // $table->foreign('dossier_medicaux_id')
            //     ->references('id')
            //     ->on('dossiers_medicauxes')
            //     ->onUpdate('cascade')
            //     ->onDelete('cascade');

            $table->unsignedBigInteger('parent_id');
            $table->foreign('parent_id')
                ->references('id')
                ->on('parents')
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
        Schema::dropIfExists('eleves');
    }
};
