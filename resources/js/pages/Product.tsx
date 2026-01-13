import { Minus, Plus, Star } from "lucide-react";
import React, { useRef, useState } from "react";
import CommonLayout from '@/Layouts/Common';
import { Head, usePage } from "@inertiajs/react";

export default function Product() {
  const { props } = usePage();
  const { product, id } = props;

  const [count, setCount] = useState(1);

  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const imgRef = useRef(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!product) {
    return (
      <div>
        <h2>Product Not Found</h2>
        <p>No product data available for ID {id}.</p>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}%${y}%`);
  };

  const displayReviews = showAllReviews
    ? product.reviews
    : product.reviews.slice(0, 1);

  return (
    <CommonLayout header={product ? product.name : "Product"}>
      <Head title={product ? product.name : "Product"} />
    <div className="text-[#262626]">
      {product && (
        <>
          <div className="flex md:flex-row flex-col gap-x-6 relative">
            <div
              className="w-full h-[26rem] md:w-1/2 hover:cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imgRef}
                className="w-full h-full"
                src={product.thumbnail}
                alt={product.title}
              />
            </div>
            <div className="flex flex-col gap-y-8 justify-center p-4">
              <h1 className="text-xl md:text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-500 pr-34 text-base md:text-xl font-semibold">
                {product.description}
              </p>
              <h4 className="text-gray-600 font-bold text-lg">
                Category: {product.category}
              </h4>
              <div className="flex gap-x-2 bg-clip-text bg-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < product.rating
                        ? "fill-blue-950 text-blue-950"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-x-2 items-center">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                  className="px-6 py-2 rounded-lg text-xl hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Minus />
                </button>
                <div className="border border-[#262626] px-6 py-1 rounded-lg">
                  <span className="text-xl font-semibold">{count}</span>
                </div>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="px-6 py-2 rounded-lg text-xl hover:bg-gray-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Plus />
                </button>
              </div>

              <div className="flex gap-x-3 items-center">
                <del className="text-gray-400 font-semibold">
                  ${product.discountPercentage}
                </del>
                <span className="text-xl md:text-2xl text-gray-600 font-bold">
                  ${(product.price * count).toFixed(2)}
                </span>
              </div>
              <button className="bg-blue-950 text-white py-2 px-8 w-fit rounded-xl cursor-pointer hover:bg-[#262626] transition-all duration-300 font-bold">
                Add to Cart
              </button>
            </div>
            {isZoomed && (
              <div
                className="absolute z-30 right-0 bottom-20 md:top-0 w-full md:w-[70%] h-1/2 md:h-full bg-white"
                style={{
                  backgroundImage: `url(${product.thumbnail})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition,
                  backgroundSize: "200%",
                  transition: "background-position 0.05s ease",
                }}
              ></div>
            )}
          </div>
          <div className="bg-blue-950 p-4">
            <h3 className="text-3xl font-bold text-white text-center mb-6">
              Review
            </h3>
            <div>
              {displayReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white text-[#262626] w-full h-[12rem] p-4 border-y border-blue-950"
                >
                  <div className="flex flex-col gap-y-4 items-start">
                    <div className="flex flex-col gap-y-2 items-start">
                      <h4 className="text-blue-950 text-lg font-bold">
                        {review.reviewerName}
                      </h4>
                      <h4 className="text-gray-400 font-semibold">
                        {review.reviewerEmail}
                      </h4>
                    </div>
                    <div className="flex gap-x-2 bg-clip-text bg-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < review.rating
                              ? "fill-blue-950 text-blue-950"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-6">{review.comment}</p>
                </div>
              ))}
            </div>
            {product.reviews.length > 1 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllReviews((prev) => !prev)}
                  className="text-white cursor-pointer"
                >
                  {showAllReviews ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
    </CommonLayout>
  );
}
