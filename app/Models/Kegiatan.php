<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatan'; 
    protected $fillable = ['nama_kegiatan', 'program_id', 'subprogram_id', 'rekening_id', 'bidang_id'];
    public $incrementing = false;
    protected $keyType = 'string';

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

    public function rekening()
    {
        return $this->belongsTo(Rekening::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function anggaran()
    {
        return $this->hasMany(Anggaran::class);
    }

    public function bidang()
    {
    return $this->belongsTo(Bidang::class);
}

}
