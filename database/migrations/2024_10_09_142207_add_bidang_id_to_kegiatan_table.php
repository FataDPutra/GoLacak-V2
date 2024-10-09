<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBidangIdToKegiatanTable extends Migration
{
    public function up()
    {
        Schema::table('kegiatan', function (Blueprint $table) {
            $table->uuid('bidang_id')->nullable()->after('rekening_id'); // Menambahkan kolom bidang_id
                $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('kegiatan', function (Blueprint $table) {
            $table->dropForeign(['bidang_id']);
            $table->dropColumn('bidang_id');
        });
    }
}
