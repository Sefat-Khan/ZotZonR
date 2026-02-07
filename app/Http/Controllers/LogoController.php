<?php

namespace App\Http\Controllers;

use App\Models\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LogoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/settings/imageAdd', [
            'logo' => Logo::first(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validatedData['image'] = $request->file('image')->store('logo', 'public');

        $logo = Logo::create([
            'image' => $validatedData['image'],
        ]);
        

        return redirect()->back()->with('success', 'Image uploaded successfully!');
    }

    public function update(Request $request, Logo $logo)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // If new image uploaded, replace old one
        if ($request->hasFile('image')) { 
            if ($logo->image && Storage::disk('public')->exists($logo->image)) { 
                Storage::disk('public')->delete($logo->image); } 
                // store new image
                $logo->image = $request->file('image')->store('logo', 'public');
        }

        $logo->save();

        return redirect()->back()->with('success', 'Image updated successfully!');
    }

    public function destroy(Logo $logo)
    {
        if ($logo->image && Storage::disk('public' . $logo->image)) {
            Storage::disk('public')->delete($logo->image);
        }

        $logo->delete();

        return redirect()->back()->with('success', 'Image deleted!');
    }
}
