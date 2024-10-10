<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Penyerapan extends Model
{
    use HasFactory;

    protected $table = 'penyerapan';
    protected $fillable = ['penyerapan_anggaran', 'persentase_penyerapan', 'kegiatan_id', 'anggaran_id'];
    public $incrementing = false;
    protected $keyType = 'string';
    protected $casts = [
    'persentase_penyerapan' => 'float',];


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid(); // Buat UUID untuk primary key
        });
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function anggaran()
    {
        return $this->belongsTo(Anggaran::class);
    }
}
