<?php

namespace App\Providers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Logo;
use App\Models\Order;
use App\Models\Product;
use App\Models\Trending;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
        'products' => fn () => Product::all(),
        'categories' => fn () => Category::all(),
        'trendings' => fn () => Trending::all(),
        'brands' => fn () => Brand::all(),
        'logo' => fn () => Logo::first(),
    ]);
    }
}
