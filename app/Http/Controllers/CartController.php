<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function show (Product $product) {
        $product->load(['brand', 'category']);

        return Inertia::render('cart', [
            'product' => $product
        ]);
    }
}
