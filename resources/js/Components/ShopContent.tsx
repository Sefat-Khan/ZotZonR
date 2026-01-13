import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { RefreshCw, ShoppingCart, X } from "lucide-react";
import FilterSection from "./filterSection";

export default function ShopContent({products, categories, brands}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [show, setShow] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = selectedCategory
        ? p.category?.name === selectedCategory
        : true;
      const brandMatch = selectedBrand ? p.brand?.name === selectedBrand : true;
      return categoryMatch && brandMatch;
    });
  }, [products, selectedCategory, selectedBrand]);

  if (loading)
    return (
      <div className="text-center py-10 text-blue-950 font-semibold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-blue-950 text-white hover:bg-rose-700 rounded-lg font-medium transition"
        >
          Filter
        </button>
      </div>

      {/* Desktop Filters */}
      <aside className="hidden md:flex flex-col gap-6 w-64 text-gray-800 border-r border-gray-200 px-4">
        <FilterSection
          title="Category"
          items={categories.map(c => c.name)}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <FilterSection
          title="Brand"
          items={brands.map(c => c.name)}
          selected={selectedBrand}
          setSelected={setSelectedBrand}
        />
      </aside>

      {/* Mobile Slide-In Sidebar */}
      {show && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShow(false)}
          ></div>
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              show ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button
                onClick={() => setShow(false)}
                className="text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-6 overflow-y-auto h-[calc(100%-64px)]">
              <FilterSection
                title="Category"
                items={categories.map(c => c.name)}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
              <FilterSection
                title="Brand"
                items={brands.map(c => c.name)}
                selected={selectedBrand}
                setSelected={setSelectedBrand}
              />
              
            </div>
          </div>
        </>
      )}

      {/* Product Grid */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link
              href={route("cart.show", item)}
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                  <button className="flex items-center gap-2 text-white font-medium hover:text-rose-500 transition">
                    <i className="fa-solid fa-heart"></i> Wishlist
                  </button>
                  <button className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition">
                    <RefreshCw size={16} /> Compare
                  </button>
                  <button className="flex items-center gap-2 text-white font-medium hover:text-green-400 transition">
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <div className="flex gap-2 items-center justify-center">
                  <del className="text-gray-500 mt-1">৳{item.price}</del>
                  <p className="text-gray-500 mt-1">৳{item.final_price}</p>
                </div>
                
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found with selected filters.
          </p>
        )}
      </main>
    </div>
  );
}
