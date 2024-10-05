<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRekeningTable extends Migration
{
    public function up()
    {
        Schema::create('rekening', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID sebagai primary key
            $table->string('no_rekening')->unique(); // no_rekening harus unik
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rekening');
    }
}
