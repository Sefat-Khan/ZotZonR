<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::orderBy('id', 'desc')->paginate(8);
        return Inertia::render('Admin/Brand/Brands', ['brands' => $brands]);
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
            'color' => 'required|string|max:7',
            'status' => 'required|in:Active,Inactive',
        ]);

        Brand::create($validatedData);

        return redirect()->route('brands.index')->with('success', 'Brand created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return Inertia::render('Admin/Brand/Preview', [
        'brand' => [
            'id' => $brand->id,
            'name' => $brand->name,
            'color' => $brand->color,
            'status' => $brand->status,
            'created_at' => $brand->created_at->format('d M Y'),
            'updated_at' => $brand->updated_at->format('d M Y'),
        ],
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
    public function update(Request $request, Brand $brand)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $brand->update($validatedData);

        return redirect()->route('brands.index')->with('success', 'Brand Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();

        return redirect()->route('brands.index')->with('success', 'Brand Deleted');
    }
}
