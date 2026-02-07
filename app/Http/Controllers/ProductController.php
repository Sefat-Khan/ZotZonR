<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\WhatsApp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Admin/product/products', ['products' => Product::with('brand', 'category', 'whatsapp')->latest()->paginate(8), 'brands' => Brand::where('status', 'Active')->get(), 'categories' => Category::where('status', 'Active')->get(), 'whatsapps' => WhatsApp::where('status', 'Active')->get(),]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'image' => 'required|image|max:5120',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'discount_price' => 'nullable|numeric',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'whatsapp_id' => 'required|exists:whats_apps,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $validatedData['image'] = $request->file('image')->store('products', 'public');

    Product::create($validatedData);

        return redirect()->route('products.index')->with('success', 'Product created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
{
    $product->load(['brand', 'category', 'whatsapp']);

    return Inertia::render('Admin/product/preview', [
        'product' => [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'description' => $product->description,
            'price' => $product->price,
            'discount_price' => $product->discount_price,
            'status' => $product->status,
            'image_url' => asset('storage/' . $product->image),
            'brand' => $product->brand,
            'category' => $product->category,
            'whatsapp' => $product->whatsapp,
            'created_at' => $product->created_at->format('d M Y'),
        ]
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
{
    $validatedData = $request->validate([
    'name' => 'nullable|string|max:255',
    'slug' => 'nullable|string|max:255|unique:products,slug,' . $product->id,
    'image' => 'nullable|image|max:5120',
    'description' => 'nullable|string',
    'price' => 'nullable|numeric',
    'discount_price' => 'nullable|numeric',
    'brand_id' => 'nullable|exists:brands,id',
    'category_id' => 'nullable|exists:categories,id',
    'whatsapp_id' => 'nullable|exists:whats_apps,id',
    'status' => 'nullable|in:Active,Inactive',
    ]);

    $validatedData = array_filter($validatedData, fn ($v) => $v !== '' && $v !== null);

    if ($request->hasFile('image')) { if ($product->image && Storage::disk('public')->exists($product->image)) { Storage::disk('public')->delete($product->image); } $validatedData['image'] = $request->file('image')->store('products', 'public'); }

    $product->update($validatedData);

    return redirect()->route('products.index')->with('success', 'Product Updated');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image && Storage::disk('public')->exists($product->image)) {
        Storage::disk('public')->delete($product->image);
    }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product Deleted');
    }
}
