<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order #{{ $order->id }}</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            background: #f5f6fa;
            color: #333;
            font-size: 14px;
            margin: 0;
            padding: 30px;
        }

        .invoice {
            max-width: 750px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
        }

        .order-id {
            font-size: 14px;
            color: #777;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            border-left: 4px solid #4f46e5;
            padding-left: 10px;
        }

        .details p {
            margin: 6px 0;
        }

        .label {
            font-weight: bold;
            color: #555;
        }

        .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }

        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
        }

        .paid {
            background: #22c55e;
        }

        .unpaid {
            background: #ef4444;
        }

        .processing {
            background: #f59e0b;
        }

        .shipped {
            background: #3b82f6;
        }

        .complete {
            background: #22c55e;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 15px;
            margin-top: 30px;
        }
    </style>
</head>
<body>

<div class="invoice">

    <!-- Header -->
    <div class="header">
        <div>
            <h1>Order Invoice</h1>
            <div class="order-id">Order #{{ $order->id }}</div>
        </div>
        <div>
            <strong>Date:</strong> {{ $order->created_at->format('d M Y') }}
        </div>
    </div>

    <!-- Customer Info -->
    <div class="section">
        <div class="section-title">Customer Information</div>
        <div class="details">
            <p><span class="label">Name:</span> {{ $order->name }}</p>
            <p><span class="label">Phone:</span> {{ $order->phone }}</p>
            <p><span class="label">Shipping Address:</span> {{ $order->shipping_address }}</p>
        </div>
    </div>

    <!-- Order Info -->
    <div class="section">
        <div class="section-title">Order Information</div>
        <div class="details">
            <p><span class="label">Product ID:</span> {{ $order->product_id }}</p>

            <p>
                <span class="label">Payment Status:</span>
                <span class="badge {{ $order->payment_info === 'Paid' ? 'paid' : 'unpaid' }}">
                    {{ $order->payment_info }}
                </span>
            </p>

            <p>
                <span class="label">Order Status:</span>
                <span class="badge {{ strtolower($order->order_status) }}">
                    {{ ucfirst($order->order_status) }}
                </span>
            </p>

            <p class="total">
                Total Amount: ৳{{ number_format($order->total_price, 2) }}
            </p>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        Thank you for shopping with us ❤️<br>
        FastCart © {{ date('Y') }}
    </div>

</div>

</body>
</html>
