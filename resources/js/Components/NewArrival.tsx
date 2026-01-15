import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, RefreshCw, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function NewArrival() {
    const { products } = usePage().props;
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!products || products.length === 0) return null;

    // Configuration
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <section className="w-full overflow-hidden bg-white px-6 py-20 md:px-20">
            <div className="mx-auto max-w-[1440px]">
                {/* Header with Luxury Styling */}
                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="h-[2px] w-12 bg-[var(--secondary-color)]"></span>
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-[var(--secondary-color)]">Just Dropped</span>
                        </div>
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#1a1a1a] md:text-6xl">
                            New <span className="text-[var(--primary-color)]">Arrivals</span>
                        </h2>
                    </div>

                    {/* Navigation UI */}
                    <div className="flex items-center gap-4">
                        <div className="mr-4 flex gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-8 bg-[var(--primary-color)]' : 'w-2 bg-gray-200'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handlePrev}
                            className="group rounded-full border-2 border-gray-100 p-4 transition-all hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                        >
                            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="group rounded-full border-2 border-gray-100 p-4 transition-all hover:border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                        >
                            <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Slider Window */}
                <div className="relative">
                    <div
                        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {/* Map through products in groups of 4 */}
                        {products.map((item) => (
                            <div key={item.id} className="w-full min-w-full px-3 md:min-w-[25%]">
                                <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-[#f9f9f9] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Premium Badge */}
                                        <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-color)]">New</span>
                                        </div>

                                        {/* Hover Overlay Buttons */}
                                        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <button className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl transition-all hover:bg-red-500 hover:text-white group-hover:translate-y-0">
                                                <Heart size={20} />
                                            </button>
                                            <Link
                                                href={route('cart.show', item)}
                                                className="flex h-14 w-14 translate-y-4 items-center justify-center rounded-full bg-[var(--primary-color)] text-white shadow-xl transition-all delay-75 hover:scale-110 group-hover:translate-y-0"
                                            >
                                                <ShoppingCart size={22} />
                                            </Link>
                                            <button className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl transition-all delay-150 hover:bg-[var(--primary-color)] hover:text-white group-hover:translate-y-0">
                                                <RefreshCw size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 text-center">
                                        <h4 className="mb-3 text-xl font-bold text-[#262626] transition-colors group-hover:text-[var(--primary-color)]">
                                            {item.name}
                                        </h4>
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-2xl font-black text-[var(--primary-color)]">৳{item.final_price}</span>
                                            {item.price > item.final_price && <del className="text-sm font-bold text-gray-300">৳{item.price}</del>}
                                        </div>

                                        <Link
                                            href={route('cart.show', item)}
                                            className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-[var(--secondary-color)]"
                                        >
                                            View Details <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
