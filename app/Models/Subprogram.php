<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subprogram extends Model
{
    use HasFactory;

    protected $fillable = ['nama_subprogram', 'program_id', 'rekening_id'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
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
