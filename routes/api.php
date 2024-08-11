<?php

use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthRegisterController; 
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;

Route::post('/sanctum/token', TokenController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/blog/store', [BlogController::class, 'store'])->name('api.blog.store');
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/blogs/get/{id}', [BlogController::class, 'show'])->name('api.blog.show');
});

/**
 * AUTH ROUTES
 */
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/users/auth', [UserController::class, 'show']);
    Route::post('/blog/store', [BlogController::class, 'store'])->name('api.blog.store');
    Route::put('/blog/update/{id}', [BlogController::class, 'update'])->name('api.blog.update'); // Neue Route für Update
    Route::get('/categories', [CategoryController::class, 'index']);
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/blog/{id}', [BlogController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Neue Route hinzugefügt

// Neue Route für den Benutzer basierend auf der user_id
Route::get('/users/{id}', [UserController::class, 'getUserById']);
Route::get('/blogs', [BlogController::class, 'index']);

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('/{vue_capture?}', function () {
    return view('index');
})->where('vue_capture', '[\/\w\.-]*');

Route::post('/register', [AuthRegisterController::class, 'register']);

// Neue Route für den authentifizierten Benutzer
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUser']);