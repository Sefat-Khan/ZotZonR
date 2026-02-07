<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->paginate(8);
        return Inertia::render('Admin/category/categories', [
        'categories' => $categories,
    ]);
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

        Category::create($validatedData);

        return redirect()->route('categories.index')->with('success', 'Category created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('Admin/category/preview', [
        'category' => [
            'id' => $category->id,
            'name' => $category->name,
            'color' => $category->color,
            'status' => $category->status,
            'created_at' => $category->created_at->format('d M Y'),
            'updated_at' => $category->updated_at->format('d M Y'),
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
    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $category->update($validatedData);

        return redirect()->route('categories.index')->with('success', 'Category Updated');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

       return redirect()->route('categories.index')->with('success', 'Category deleted');
    }
}
