<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Order/Orders', [
            'orders' => Order::latest()->paginate(8),
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
            'name' => 'required|string',
            'phone' => 'required|string',
            'shipping_address' => 'required|string',
            'cart' => 'required|array',
        ]);

        foreach ($request->cart as $item) {
            $product = Product::findOrFail($item['id']);

            Order::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name . '-' . uniqid()),
                'product_id' => $product->id,
                'user_id' => auth()->id(),
                'image' => $product->image,
                'phone' => $request->phone,
                'shipping_address' => $request->shipping_address,
                'total_price' => $item['totalPrice'],
                'payment_info' => 'Unpaid',
                'order_status' => 'processing',
                'status' => 'Active',
            ]);
        }

        return redirect()->route('home')->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return inertia('Admin/Order/Preview', [
            'order' => $order,
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
    public function update(Request $request, Order $order)
    {
        $order->update($request->only([
            'payment_info',
            'order_status',
            'status',
        ]));

        return back()->with('success', 'Order updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return back()->with('success', 'Order deleted');
    }
}
