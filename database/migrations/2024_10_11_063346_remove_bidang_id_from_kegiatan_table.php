<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('kegiatan', function (Blueprint $table) {
        $table->dropForeign(['bidang_id']); // Hapus foreign key constraint
        $table->dropColumn('bidang_id'); // Hapus kolom bidang_id
    });
}

public function down()
{
    Schema::table('kegiatan', function (Blueprint $table) {
        $table->uuid('bidang_id')->nullable(); // Tambahkan kembali kolom bidang_id jika rollback
        $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('cascade');
    });
}

};
