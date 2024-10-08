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
        $table->uuid('program_id')->nullable()->after('perubahan');
        $table->uuid('sub_program_id')->nullable()->after('program_id');

        // Optional: add foreign key constraints if needed
        $table->foreign('program_id')->references('id')->on('programs')->onDelete('cascade');
        $table->foreign('sub_program_id')->references('id')->on('subprograms')->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('anggaran', function (Blueprint $table) {
        $table->dropForeign(['program_id']);
        $table->dropForeign(['sub_program_id']);
        $table->dropColumn(['program_id', 'sub_program_id']);
    });
}

};
