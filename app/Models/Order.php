<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'product_id',
        'user_id',
        'image',
        'phone',
        'shipping_address',
        'total_price',
        'payment_info',
        'order_status',
        'status',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute() {
        return $this->image ? asset('storage/'. $this->image) : asset('images/no-image.png');
    }

    public function product () {
        return $this->belongsTo(Product::class);
    }

    public function user () {
        return $this->belongsTo(User::class);
    }
}
