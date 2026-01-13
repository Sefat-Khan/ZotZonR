import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function SpecialOffer() {
  const {products} = usePage().props;

      const recentProducts = [...products].sort((a, b) => a.final_price - b.final_price).slice(0, 4);


  return (
    <div className="bg-[var(--primary-color)] py-10 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-white)] text-center mb-10">
        Special Offer
      </h2>

      <div className="flex flex-wrap justify-center gap-6 cursor-pointer">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[var(--secondary-color)] text-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[220px] md:w-[250px] hover:scale-105 transition-transform duration-300"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-52 object-contain bg-[#f5f5f5]"
              />
              <span className="absolute top-3 left-3 bg-[#ff3e3e] px-3 py-1 text-xs font-semibold rounded">
                New
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-gray-200 font-semibold text-sm md:text-base">
                {product.name}
              </h4>
              <p className="text-gray-400 text-xs md:text-sm">{product.color}</p>
              <div>
                <span className="text-white font-bold text-sm md:text-base">
                ৳ {product.final_price}
              </span>
                <del className="ml-2 text-white font-bold text-sm md:text-base">৳ {product.price}</del>
                
              </div>
              
            </div>

            {/* Hover Buttons */}
            <div className="flex justify-center gap-2 p-3">
              <Link href={route('cart.show', product)} className="bg-[var(--text-black)] text-white px-3 py-1 rounded text-xs hover:bg-white hover:text-[var(--primary-color)] scale-100 hover:scale-110 transition-all duration-300">
                Add to Cart
              </Link>
              <Link href={route('shop.index')} className="bg-white text-[var(--text-black)] px-3 py-1 rounded text-xs hover:bg-[var(--primary-color)] hover:text-white scale-100 hover:scale-110 transition-all duration-300">
                Wishlist
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
