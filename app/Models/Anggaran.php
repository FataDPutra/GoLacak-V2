<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Anggaran extends Model
{
    use HasFactory;

    protected $table = 'anggaran'; // Nama tabel
    protected $fillable = ['anggaran_murni', 'pergeseran', 'perubahan', 'program_id', 'sub_program_id', 'kegiatan_id', 'bidang_id']; // Tambahkan bidang_id
    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid(); // Buat UUID untuk primary key
        });
    }

    // Relasi ke program, subprogram, kegiatan, dan bidang
    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function subprogram()
    {
        return $this->belongsTo(Subprogram::class, 'sub_program_id');
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function bidang()
    {
        return $this->belongsTo(Bidang::class); // Relasi ke bidang
    }
}
