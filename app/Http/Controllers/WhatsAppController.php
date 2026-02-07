<?php

namespace App\Http\Controllers;

use App\Models\WhatsApp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhatsAppController extends Controller
{
    public function index()
    {
        $whatsApp = WhatsApp::orderBy('id', 'desc')->paginate(8);
        return Inertia::render('Admin/whatsApp/whatsApp', ['whatsApp' => $whatsApp]);
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
            'phone' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        WhatsApp::create($validatedData);

        return redirect()->route('whatsApp.index')->with('success', 'WhatsApp Number created');
    }

    /**
     * Display the specified resource.
     */
    public function show(WhatsApp $whatsApp)
    {
        return Inertia::render('Admin/whatsApp/preview', [
        'whatsApp' => [
            'id' => $whatsApp->id,
            'phone' => $whatsApp->phone,
            'status' => $whatsApp->status,
            'created_at' => $whatsApp->created_at->format('d M Y'),
            'updated_at' => $whatsApp->updated_at->format('d M Y'),
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
    public function update(Request $request, WhatsApp $whatsApp)
    {
        $validatedData = $request->validate([
            'phone' => 'nullable|string|max:255',
            'status' => 'nullable|in:Active,Inactive',
        ]);

        $whatsApp->update($validatedData);
        return redirect()->route('whatsApp.index')->with('success', 'WhatsApp Number Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WhatsApp $whatsApp)
    {
        $whatsApp->delete();

        return redirect()->route('whatsApp.index')->with('success', 'WhatsApp Number Deleted');
    }
}
