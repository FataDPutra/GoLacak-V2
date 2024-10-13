<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Buat tabel 'bidang' terlebih dahulu
        Schema::create('bidang', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_bidang');
            $table->timestamps();
        });

        // Buat tabel 'users' setelah tabel 'bidang' ada
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Ubah primary key menjadi UUID
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role')->default('user'); // Default role adalah user
            $table->uuid('bidang_id')->nullable(); // Relasi ke tabel bidang
            $table->foreign('bidang_id')->references('id')->on('bidang')->onDelete('cascade'); // Relasi foreign key
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Hapus foreign key dulu sebelum drop tabel users
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['bidang_id']);
        });

        Schema::dropIfExists('users');
        Schema::dropIfExists('bidang');
    }
};
