<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Rekening extends Model
{
    use HasFactory;

    protected $table = 'rekening'; // Tentukan nama tabel secara eksplisit

    protected $fillable = ['no_rekening'];

    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            // Buat UUID untuk primary key
            $model->id = (string) Str::uuid();
        });
    }

    // Relasi one-to-many dengan Program
    public function programs()
    {
        return $this->hasMany(Program::class);
    }
}
