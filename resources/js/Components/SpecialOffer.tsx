import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ShoppingCart, Heart, Tag } from 'lucide-react';

export default function SpecialOffer() {
    const { products } = usePage().props;

    // Sorting by lowest price to highlight the best deals
    const specialDeals = [...(products || [])].sort((a, b) => a.final_price - b.final_price).slice(0, 4);

    if (specialDeals.length === 0) return null;

    return (
        <section className="bg-[var(--primary-color)] px-6 py-20 md:px-20">
            <div className="mx-auto max-w-[1440px]">
                {/* Section Header */}
                <div className="mb-16 space-y-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <Tag className="text-[var(--secondary-color)]" size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-[var(--secondary-color)]">Unbeatable Prices</span>
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white md:text-6xl">
                        Special <span className="text-[var(--secondary-color)]">Offers</span>
                    </h2>
                    <p className="mx-auto max-w-md text-sm font-medium text-white/40">
                        Our most popular items at their lowest prices ever. Grab them before they're gone.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {specialDeals.map((product) => {
                        // Calculate percentage discount
                        const discount = Math.round(((product.price - product.final_price) / product.price) * 100);

                        return (
                            <div
                                key={product.id}
                                className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-3"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square w-full overflow-hidden bg-[#f9f9f9]">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Discount Badge */}
                                    {discount > 0 && (
                                        <div className="absolute left-5 top-5 animate-pulse rounded-xl bg-red-600 px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-white shadow-lg">
                                            {discount}% OFF
                                        </div>
                                    )}

                                    {/* Quick Actions (Desktop Hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Link
                                            href={route('cart.show', product)}
                                            className="rounded-full bg-[var(--primary-color)] p-4 text-white transition-transform hover:scale-110"
                                        >
                                            <ShoppingCart size={20} />
                                        </Link>
                                        <button className="rounded-full bg-white p-4 text-black transition-all hover:bg-red-500 hover:text-white">
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col items-center p-8 text-center">
                                    <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--primary-color)]">
                                        {product.color}
                                    </span>
                                    <h4 className="mb-4 line-clamp-1 text-lg font-bold text-gray-900">{product.name}</h4>

                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="text-2xl font-black text-gray-900">৳{product.final_price}</span>
                                        {product.price > product.final_price && (
                                            <del className="text-sm font-bold text-gray-400">৳{product.price}</del>
                                        )}
                                    </div>

                                    <Link
                                        href={route('cart.show', product)}
                                        className="w-full rounded-2xl bg-gray-100 py-4 text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] transition-all hover:bg-[var(--primary-color)] hover:text-white"
                                    >
                                        Add To Cart
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}