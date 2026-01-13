<?php

namespace App\Http\Controllers;

use App\Models\Trending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TrendingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return Inertia::render('Admin/Trending/Trendings', ['trendings' => Trending::latest()->paginate(8)]);

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
            'description' => 'nullable|min:5',
            'discount' => 'nullable|numeric',
            'status' => 'required|in:Active,Inactive',
        ]);

        $validatedData['image'] = $request->file('image')->store('products', 'public');

Trending::create($validatedData);

        return redirect()->route('trendings.index')->with('success', 'Trending created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trending $trending)
    {
        return Inertia::render('Admin/Trending/Preview', [
        'trending' => [
            'id' => $trending->id,
            'name' => $trending->name,
            'slug' => $trending->slug,
            'phone' => $trending->phone,
            'description' => $trending->description,
            'price' => $trending->price,
            'discount_price' => $trending->discount_price,
            'status' => $trending->status,
            'image_url' => asset('storage/' . $trending->image),
            'brand' => $trending->brand,
            'category' => $trending->category,
            'created_at' => $trending->created_at->format('d M Y'),
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
    public function update(Request $request, Trending $trending)
{
    $validatedData = $request->validate([
    'name' => 'nullable|string|max:255',
    'slug' => 'nullable|string|max:255|unique:products,slug,' . $trending->id,
    'image' => 'nullable|image|max:5120',
    'description' => 'nullable|min:5',
    'discount_price' => 'nullable|numeric',
    'status' => 'nullable|in:Active,Inactive',
    ]);

    $validatedData = array_filter($validatedData, fn ($v) => $v !== '' && $v !== null);

    if ($request->hasFile('image')) { if ($trending->image && Storage::disk('public')->exists($trending->image)) { Storage::disk('public')->delete($trending->image); } $validatedData['image'] = $request->file('image')->store('trendings', 'public'); }

    $trending->update($validatedData);

    return redirect()->route('trendings.index')->with('success', 'Trending Updated');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trending $trending)
    {
        if ($trending->image && Storage::disk('public')->exists($trending->image)) {
        Storage::disk('public')->delete($trending->image);
    }

        $trending->delete();

        return redirect()->route('trendings.index')->with('success', 'Trending Deleted');
    }
}
