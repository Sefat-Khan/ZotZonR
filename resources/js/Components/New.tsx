import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';

export default function New() {
    const { products } = usePage().props;

    // Safeguard and filter for the 4 most recent items
    const recentProducts = [...(products || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);

    if (recentProducts.length === 0) return null;

    return (
        <section className="bg-[var(--primary-color)] px-6 py-16 md:px-20">
            {/* Section Header */}
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="h-[1px] w-8 bg-[var(--secondary-color)]"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--secondary-color)]">Fresh Picks</span>
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white md:text-5xl">New Arrivals</h2>
                </div>

                <Link
                    href={route('shop.index')}
                    className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                >
                    View All Collection <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {recentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-[var(--secondary-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5]">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* "New" Badge */}
                            <div className="absolute left-4 top-4 rounded-full bg-[var(--primary-color)] px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter text-white shadow-xl">
                                New
                            </div>

                            {/* Quick Action Overlay (Desktop Only) */}
                            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <Link
                                    href={route('cart.show', product)}
                                    className="translate-y-4 transform rounded-full bg-white p-3 text-black transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white group-hover:translate-y-0"
                                >
                                    <ShoppingCart size={18} />
                                </Link>
                                <button className="translate-y-4 transform rounded-full bg-white p-3 text-black transition-all delay-75 duration-300 hover:bg-red-500 hover:text-white group-hover:translate-y-0">
                                    <Heart size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-grow flex-col p-6">
                            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">{product.color}</p>
                            <h4 className="mb-3 line-clamp-1 text-lg font-bold leading-tight text-white">{product.name}</h4>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white">৳{product.final_price}</span>
                                    {product.price > product.final_price && (
                                        <span className="text-xs font-medium text-white/40 line-through">৳{product.price}</span>
                                    )}
                                </div>

                                {/* Mobile Cart Button */}
                                <Link href={route('cart.show', product)} className="rounded-full bg-white/10 p-3 text-white md:hidden">
                                    <ShoppingCart size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}