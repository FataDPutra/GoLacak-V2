<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Bidang;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat Bidang contoh
        $bidang = Bidang::create([
            'id' => (string) Str::uuid(),
            'nama_bidang' => 'Teknologi Informasi',
        ]);

        // Buat User dengan Bidang yang sudah dibuat
        User::create([
            'id' => (string) Str::uuid(),
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // Menggunakan Hash untuk password
            'role' => 'admin',
            'bidang_id' => null,
        ]);

        // Buat User tanpa bidang
        User::create([
            'id' => (string) Str::uuid(),
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'bidang_id' => $bidang->id, // Relasi ke bidang yang sudah dibuat
        ]);
    }
}
