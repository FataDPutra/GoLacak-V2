<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnggaranTable extends Migration
{
    public function up()
    {
        Schema::create('anggaran', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('anggaran_murni', 15, 2);
            $table->decimal('pergeseran', 15, 2)->default(0); // Default ke 0
            $table->decimal('perubahan', 15, 2)->default(0); // Default ke 0
            $table->uuid('kegiatan_id'); // Foreign key ke tabel rekening
            $table->foreign('kegiatan_id')->references('id')->on('kegiatan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('anggaran');
    }
}
