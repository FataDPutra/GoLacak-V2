<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $incrementing = false; // Nonaktifkan auto-increment
    protected $keyType = 'string'; // Gunakan string untuk UUID

    protected $fillable = [
        'name', 'email', 'password', 'role', 'bidang_id'
    ];

    // Relasi ke Bidang
    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid(); // Buat UUID
        });
    }
}
