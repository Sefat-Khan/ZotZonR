<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class UserOrderController extends Controller
{
    // app/Http/Controllers/OrderController.php

public function userOrders()
{
    // Fetch only orders of the logged-in user
    $orders = Order::where('user_id', auth()->id())
        ->latest()
        ->get();

    return inertia('Order', [
        'orders' => $orders,
    ]);
}

public function show(Order $order)
    {
        
        return inertia('OrderDetails', ['order' => $order]);
    }

public function generatePDF(Order $order) {
    $pdf = Pdf::loadView('pdf.order', ['order' => $order]);
    return $pdf->download('order'. $order->id.'.pdf');
}

}
