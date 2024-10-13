<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Bidang extends Model
{
    use HasFactory;

    protected $table = 'bidang';
    protected $fillable = ['nama_bidang'];
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });

    }

    public function kegiatans()
    {
        return $this->hasMany(Kegiatan::class);
    }

    public function users()
    {
    return $this->hasMany(User::class, 'bidang_id', 'id'); // Menggunakan UUID
    }

}
