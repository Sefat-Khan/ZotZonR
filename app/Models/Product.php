<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'description',
        'price',
        'discount_price',
        'brand_id',
        'category_id',
        'whatsapp_id',
        'status',
    ];

    // 👇 THIS PART IS IMPORTANT
    protected $appends = ['image_url', 'final_price'];

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : asset('images/no-image.png');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function whatsapp()
    {
        return $this->belongsTo(WhatsApp::class);
    }


    public function getFinalPriceAttribute()
    {
        if ($this->discount_price) {
            return round(
                $this->price - ($this->price * $this->discount_price / 100),
                2
            );
        }

        return $this->price;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}

