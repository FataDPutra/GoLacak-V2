<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramsTable extends Migration
{
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_program');
            $table->string('target');
            $table->string('satuan');
            $table->string('indikator_kinerja');
            $table->uuid('rekening_id'); // Foreign key ke tabel rekening
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('rekening_id')->references('id')->on('rekening')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('programs');
    }
}
