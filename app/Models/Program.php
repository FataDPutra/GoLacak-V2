<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Program extends Model
{
    use HasFactory;
    protected $fillable = ['nama_program', 'rekening_id', 'target', 'satuan', 'indikator_kinerja'];
    public $incrementing = false;
    protected $keyType = 'string';


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function rekening()
    {
        return $this->belongsTo(Rekening::class);
    }

    public function subprograms()
    {
        return $this->hasMany(Subprogram::class);
    }

    public function kegiatans()
    {
        return $this->hasMany(Kegiatan::class);
    }
}
