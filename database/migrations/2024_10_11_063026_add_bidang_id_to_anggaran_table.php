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
    Schema::table('anggaran', function (Blueprint $table) {
        $table->uuid('bidang_id')->after('kegiatan_id'); // Tambahkan bidang_id
        $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('anggaran', function (Blueprint $table) {
        $table->dropForeign(['bidang_id']);
        $table->dropColumn('bidang_id');
    });
}
};
