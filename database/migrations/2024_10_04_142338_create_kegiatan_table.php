<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKegiatanTable extends Migration
{
    public function up()
    {
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_kegiatan');
            $table->uuid('subprogram_id');  // Foreign key ke tabel subprograms
            $table->uuid('program_id');     // Foreign key ke tabel programs
            $table->uuid('rekening_id');    // Foreign key ke tabel rekening
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('subprogram_id')->references('id')->on('subprograms')->onDelete('cascade');
            $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
            $table->foreign('rekening_id')->references('id')->on('rekening')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('kegiatan');
    }
}
