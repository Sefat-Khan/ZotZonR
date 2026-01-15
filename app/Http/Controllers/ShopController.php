<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop', [
            'products' => Product::with(['brand', 'category'])
                ->where('status', 'Active')
                ->latest()->get(),

            'categories' => Category::where('status', 'Active')->get(),
            'brands' => Brand::where('status', 'Active')->get(),
        ]);
    }
}
