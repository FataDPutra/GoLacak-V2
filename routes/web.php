<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SubprogramController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\AnggaranController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\RekeningController;
use App\Http\Controllers\PenyerapanController;
use App\Http\Controllers\BidangController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

// Halaman utama
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// // API untuk mendapatkan semua bidang
// Route::get('/api/bidangs', function () {
//     return \App\Models\Bidang::all();
// });

// Route::middleware(['guest'])->group(function () {
//     Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
//     Route::post('/register', [RegisteredUserController::class, 'store']);
// });
// Rute profil user

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute untuk role user
Route::middleware(['auth', 'role:user'])->group(function () {
    Route::resource('bidang', BidangController::class)->only(['index']);
    Route::resource('programs', ProgramController::class);
    Route::resource('subkegiatan', KegiatanController::class);
    Route::resource('kegiatan', SubprogramController::class);
    Route::resource('anggaran', AnggaranController::class);
    Route::resource('realisasi', PenyerapanController::class);


});

// Rute untuk role admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    // Route::get('/register', [RegisteredUserController::class, 'create'])->name('admin.register.index');
    // Route::post('/register', [RegisteredUserController::class, 'store'])->name('admin.register.store');
    Route::resource('bidang', BidangController::class)->except(['index']);
    Route::resource('users', UserController::class);
    Route::resource('programs', ProgramController::class);
    Route::resource('subkegiatan', KegiatanController::class);
    Route::resource('kegiatan', SubprogramController::class);
    Route::resource('anggaran', AnggaranController::class);
    Route::resource('realisasi', PenyerapanController::class);


});

require __DIR__.'/auth.php';
