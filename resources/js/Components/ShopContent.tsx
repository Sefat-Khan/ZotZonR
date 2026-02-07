import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Heart, Package, RefreshCw, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FilterSection from './filterSection';

export default function ShopContent({ products, categories, brands }) {
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const item_per_page = 12;

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const categoryMatch = selectedCategory ? p.category?.name === selectedCategory : true;
            const brandMatch = selectedBrand ? p.brand?.name === selectedBrand : true;
            return categoryMatch && brandMatch;
        });
    }, [products, selectedCategory, selectedBrand]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * item_per_page;
        return filteredProducts.slice(startIndex, startIndex + item_per_page);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / item_per_page);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedBrand]);

    if (loading)
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <RefreshCw className="animate-spin text-[var(--secondary-color)]" size={48} />
            </div>
        );

    return (
        <div className="container mx-auto flex flex-col gap-8 px-4 py-12 md:flex-row">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
                <button
                    onClick={() => setShow(true)}
                    className="shadow-maroon-900/20 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] py-4 font-bold uppercase tracking-widest text-white shadow-lg"
                >
                    <SlidersHorizontal size={18} /> Filter Collection
                </button>
            </div>

            {/* Sidebar: Desktop Filters */}
            <aside className="hidden w-72 flex-shrink-0 flex-col gap-8 md:flex">
                <div className="sticky top-24 space-y-8">
                    <div className="border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-[var(--primary-color)]">Filters</h2>
                    </div>
                    <FilterSection
                        title="Category"
                        items={categories.map((c) => c.name)}
                        selected={selectedCategory}
                        setSelected={setSelectedCategory}
                    />
                    <FilterSection title="Brand" items={brands.map((c) => c.name)} selected={selectedBrand} setSelected={setSelectedBrand} />
                </div>
            </aside>

            {/* Mobile Slide-In Sidebar */}
            {show && (
                <>
                    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)}></div>
                    <div className="fixed left-0 top-0 z-[70] h-full w-80 bg-white p-6 shadow-2xl transition-transform duration-300">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase text-[var(--primary-color)]">Filters</h2>
                            <button onClick={() => setShow(false)} className="rounded-full bg-gray-100 p-2 hover:bg-red-50 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-8">
                            <FilterSection
                                title="Category"
                                items={categories.map((c) => c.name)}
                                selected={selectedCategory}
                                setSelected={setSelectedCategory}
                            />
                            <FilterSection title="Brand" items={brands.map((c) => c.name)} selected={selectedBrand} setSelected={setSelectedBrand} />
                        </div>
                    </div>
                </>
            )}

            {/* Product Grid */}
            <main className="flex-1">
                <div className="mb-8 flex items-end justify-between border-b border-gray-100 pb-6">
                    <p className="font-medium text-gray-500">
                        Showing <span className="font-bold text-[var(--primary-color)]">{filteredProducts.length}</span> results
                    </p>
                </div>

                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedProducts.map((item) => (
                            <div key={item.id} className="group relative flex flex-col">
                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Discount Badge */}
                                    {item.price > item.final_price && (
                                        <div className="absolute left-3 top-3 rounded-md bg-[var(--secondary-color)] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                            Sale
                                        </div>
                                    )}

                                    {/* Hover Actions Overlay */}
                                    <div className="absolute inset-x-0 bottom-4 mx-auto flex w-max translate-y-8 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <button className="rounded-full bg-white p-3 text-[var(--primary-color)] shadow-xl transition hover:bg-[var(--secondary-color)] hover:text-white">
                                            <Heart size={18} />
                                        </button>
                                        <Link
                                            href={route('cart.show', item)}
                                            className="flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:bg-[var(--secondary-color)]"
                                        >
                                            <ShoppingCart size={16} /> Add to Cart
                                        </Link>
                                        <button className="rounded-full bg-white p-3 text-[var(--primary-color)] shadow-xl transition hover:bg-[var(--secondary-color)] hover:text-white">
                                            <RefreshCw size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="mt-4 flex flex-col items-center">
                                    <h4 className="text-sm font-bold uppercase tracking-tight text-[var(--text-black)] transition-colors group-hover:text-[var(--secondary-color)]">
                                        {item.name}
                                    </h4>
                                    <div className="mt-1 flex items-center gap-2">
                                        {item.price > item.final_price && (
                                            <span className="text-xs font-medium text-gray-400 line-through">৳{item.price}</span>
                                        )}
                                        <span className="text-lg font-black italic text-[var(--primary-color)]">৳{item.final_price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Package size={48} className="mb-4 text-gray-200" />
                        <p className="text-xl font-medium italic text-gray-400">No products matched your refinement.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('');
                                setSelectedBrand('');
                            }}
                            className="mt-4 text-xs font-bold uppercase tracking-widest text-[var(--secondary-color)] underline underline-offset-4"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Modern Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-4 border-t border-gray-100 pt-10">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[var(--secondary-color)] hover:text-[var(--secondary-color)] disabled:opacity-20"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`h-10 w-10 rounded-full text-xs font-black transition-all ${
                                        currentPage === i + 1
                                            ? 'shadow-maroon-900/30 bg-[var(--primary-color)] text-white shadow-lg'
                                            : 'text-gray-400 hover:bg-gray-100'
                                    }`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:border-[var(--secondary-color)] hover:text-[var(--secondary-color)] disabled:opacity-20"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
