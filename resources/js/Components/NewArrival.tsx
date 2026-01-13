import axios from "axios";
import { ArrowLeft, ArrowRight, RefreshCw, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, usePage } from '@inertiajs/react';

export default function NewArrival() {
  const { products } = usePage().props;

  

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;
  const cardWidth = 336;
  const containerRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < products.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(products.length - visibleCards);
    }
  };


  return (
    <div className="bg-[var(--primary-color)]">
      <div className="py-10 px-6 bg-white relative overflow-hidden">
        <h2 className="text-start text-3xl text-[#262626] font-bold mb-6">
          New Arrival
        </h2>
        <div>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-500 cursor-pointer rounded-full shadow-md p-2 hover:bg-gray-100 z-50"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-500 cursor-pointer rounded-full shadow-md p-2 hover:bg-gray-100 z-50"
          >
            <ArrowRight />
          </button>
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="w-max flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + 24)}px)`,
              }}
            >
              {products.map((item, i) => (
                <Link
                  href={route('cart.show', item)}
                  state={{ product: item }}
                  key={`${item.id}-${i}`}
                  className="min-w-[21rem] bg-[#f8f8f8] rounded-lg shadow-sm relative"
                >
                  <div className="relative overflow-hidden group">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 text-black p-2 flex flex-col items-end gap-2 group-hover:translate-y-[50%] translate-y-full bg-white transition-transform duration-300 bottom-0 right-0">
                      <button className="flex gap-x-2 transition-transform duration-300 ease-in">
                        Add to wish list
                        <i className="fa-solid fa-heart"></i>
                      </button>
                      <button className="flex gap-x-2 transition-transform duration-300 ease-in">
                        Compare
                        <RefreshCw />
                      </button>
                      <button className="flex gap-x-2 transition-transform duration-300 ease-in">
                        Add to Cart
                        <ShoppingCart />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="text-[#262626] font-semibold">
                      {item.title}
                    </h4>
                  <div>
                    <span className="text-gray-600">
                      ${item.final_price}
                    </span>
                    <del className="ml-2 text-gray-600">৳ {item.price}</del>
                  </div>
                    
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
