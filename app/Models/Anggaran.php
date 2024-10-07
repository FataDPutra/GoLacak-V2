<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Anggaran extends Model
{
    use HasFactory;
    protected $table = 'kegiatan'; // Nama tabel
    protected $fillable = ['anggaran_murni', 'pergeseran', 'perubahan', 'kegiatan_id'];
    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }
}
