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
            'orders' => Order::with('items.product')->latest()->paginate(8),
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

        $order = Order::create([
        'name' => $request->name,
        'phone' => $request->phone,
        'shipping_address' => $request->shipping_address,
        'user_id' => auth()->id(),
        'total_price' => collect($request->cart)->sum('totalPrice'),
        'payment_info' => 'Unpaid',
        'order_status' => 'Processing',
        'status' => 'Active',
    ]);

    foreach ($request->cart as $item) {
        $order->items()->create([
            'product_id' => $item['id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
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
        'order' => $order->load('items.product'),
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
        $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'shipping_address' => 'required|string',
            'payment_info' => 'required|in:Paid,Unpaid',
            'order_status' => 'required|in:Processing,Shipped,Complete',
            'status' => 'required|in:Active,Inactive',
        ]);

        $order->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'shipping_address' => $request->shipping_address,
            'payment_info' => $request->payment_info,
            'order_status' => $request->order_status,
            'status' => $request->status,
        ]);

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
