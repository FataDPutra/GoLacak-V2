<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Kegiatan extends Model
{
    use HasFactory;
    protected $table = 'kegiatan'; // Tentukan nama tabel secara eksplisit


    protected $fillable = ['nama_kegiatan', 'subprogram_id', 'program_id', 'rekening_id'];

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

    public function rekening()
    {
        return $this->belongsTo(Rekening::class);
    }
}
