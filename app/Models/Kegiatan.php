<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatan'; // Nama tabel

    protected $fillable = ['nama_kegiatan', 'subprogram_id', 'program_id', 'rekening_id']; // Tambahkan rekening_id

    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function subprogram()
    {
        return $this->belongsTo(Subprogram::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    // Relasi dengan Rekening
    public function rekening()
    {
        return $this->belongsTo(Rekening::class);
    }
}
