<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreatePenyerapanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penyerapan', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID sebagai primary key
            $table->decimal('penyerapan_anggaran', 15, 2); // Penyerapan anggaran, dengan skala desimal untuk jumlah uang
            $table->decimal('persentase_penyerapan', 5, 2); // Persentase penyerapan
            $table->uuid('kegiatan_id'); // Foreign key ke tabel kegiatan
            $table->uuid('anggaran_id'); // Foreign key ke tabel anggaran
            $table->timestamps();

            // Tambahkan constraint foreign key
            $table->foreign('kegiatan_id')->references('id')->on('kegiatan')->onDelete('cascade');
            $table->foreign('anggaran_id')->references('id')->on('anggaran')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('penyerapan');
    }
}
