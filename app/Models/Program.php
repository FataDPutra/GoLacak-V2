<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Program extends Model
{
    use HasFactory;

    // Isi kolom yang dapat diisi
    protected $fillable = ['nama_program', 'rekening_id'];

    // UUID sebagai primary key
    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    // Boot method untuk membuat UUID setiap kali record baru dibuat
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            // Buat UUID untuk primary key
            $model->id = (string) Str::uuid();
        });
    }

    // Relasi dengan tabel Rekening (many-to-one)
    public function rekening()
    {
        return $this->belongsTo(Rekening::class);
    }
}
