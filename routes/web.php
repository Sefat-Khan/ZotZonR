<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TrendingsController;
use App\Http\Controllers\UserOrderController;
use App\Http\Controllers\WhatsAppController;
use App\Http\Controllers\LogoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'auth' => [
           'user' => auth()->check() ? auth()->user()->only(['id', 'name', 'email', 'role']) : null,
        ],
    ]);
})->name('home');

Route::get('/cart/{product}', [CartController::class, 'show'])->name('cart.show');

Route::get('/products', [ShopController::class, 'index'])->name('shop.index');

Route::get('/checkout', function () {
    return Inertia::render('checkOut');
})->name('checkout');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');


Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function () {



    Route::resource('/admin/categories', CategoryController::class)
        ->names('categories');

    Route::resource('/admin/brands', BrandController::class)
        ->names('brands');

    Route::resource('/admin/products', ProductController::class)
        ->names('products');

    Route::resource('/admin/trendings', TrendingsController::class)
        ->names('trendings');


    Route::resource('/admin/orders', OrderController::class)
        ->names('orders');

    Route::resource('/admin/whatsApp', WhatsAppController::class)
        ->names('whatsApp');

    Route::resource('/admin/logo', LogoController::class)
        ->names('logo');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('auth')->post('/orders', [OrderController::class, 'store'])
    ->name('orders.store');

    Route::get('/orders', [UserOrderController::class, 'userOrders'])->name('user.order');

    Route::get('/order/{order}', [UserOrderController::class, 'show'])
        ->name('user.order.show');

    // Route::get('/order/{order}/pdf', [UserOrderController::class, 'generatePDF'])
    //     ->name('order.pdf');
});

require __DIR__.'/auth.php';
