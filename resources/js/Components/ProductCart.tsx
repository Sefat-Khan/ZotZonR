import React, { useState } from "react";
import CommonLayout from "@/Layouts/Common";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCart({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const price = product.final_price;
  const totalPrice = (price * quantity).toFixed(2);

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in this product:\n\n` +
    `${product.name}\n` +
    `Price: ৳${price}\n` +
    `Quantity: ${quantity}\n` +
    `Total: ৳${totalPrice}`
  );

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* LEFT: IMAGE */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[var(--primary-color)]">
              {product.name}
            </h1>

            <div className="text-sm text-gray-500 flex gap-4">
              <span>Brand: {product.brand?.name}</span>
              <span>Category: {product.category?.name}</span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-2">
              {product.discount_price ? (
                <>
                  <span className="line-through text-gray-400 text-lg">
                    ৳{product.price}
                  </span>
                  <span className="text-[var(--primary-color)] text-2xl font-bold">
                    ৳{price}
                  </span>
                  <span className="text-green-600 text-sm">
                    -{product.discount_price}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ৳{price}
                </span>
              )}
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium text-gray-700">Quantity:</span>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-3 hover:bg-[var(--primary-color)] hover:text-white transition"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4 py-2 min-w-[40px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="px-3 py-3 hover:bg-[var(--primary-color)] hover:text-white transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* TOTAL */}
            <div className="text-lg font-semibold text-gray-800">
              Total: ৳{totalPrice}
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${product.phone}?text=${whatsappMessage}`}
                target="_blank"
                className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                WhatsApp Order
              </a>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity, totalPrice)}
                className="flex justify-center items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white px-6 py-3 rounded-lg font-medium transition"
                >
                <ShoppingCart size={18} />
                Add to Cart
                </button>

            </div>
          </div>
        </div>
      </div>
    
  );
}


