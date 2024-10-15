<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubprogramsTable extends Migration
{
    public function up()
    {
        Schema::create('subprograms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_subprogram');
            $table->string('target');
            $table->string('satuan');
            $table->string('indikator_kinerja');
            $table->uuid('program_id');  // Foreign key ke tabel programs
            $table->uuid('rekening_id'); // Foreign key ke tabel rekening
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
            $table->foreign('rekening_id')->references('id')->on('rekening')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('subprograms');
    }
}
