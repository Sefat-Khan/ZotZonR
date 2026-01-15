import CommonLayout from '@/Layouts/Common';
import { Head, usePage } from '@inertiajs/react';
import { MessageCircle, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Product() {
    const { props } = usePage();
    const { product, id } = props;

    const [count, setCount] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState('center');
    const imgRef = useRef(null);
    const [showAllReviews, setShowAllReviews] = useState(false);

    if (!product) {
        return (
            <CommonLayout header="Product Not Found">
                <div className="py-20 text-center">
                    <h2 className="text-2xl font-bold">Product Not Found</h2>
                    <p className="text-gray-500">No product data available for ID {id}.</p>
                </div>
            </CommonLayout>
        );
    }

    const handleMouseMove = (e) => {
        const { top, left, width, height } = imgRef.current.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    const displayReviews = showAllReviews ? product.reviews : product.reviews?.slice(0, 1) || [];

    return (
        <CommonLayout header={product.title}>
            <Head title={product.title} />

            <div className="mx-auto max-w-[1440px] bg-white px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* LEFT: IMAGE WITH SMART ZOOM */}
                    <div className="group relative cursor-zoom-in overflow-hidden rounded-[2rem] bg-[#f9f9f9]">
                        <img
                            ref={imgRef}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={handleMouseMove}
                            className={`aspect-square w-full object-contain p-10 transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
                            src={product.thumbnail}
                            alt={product.title}
                        />

                        {/* ZOOM OVERLAY */}
                        {isZoomed && (
                            <div
                                className="pointer-events-none absolute inset-0 z-10 rounded-[2rem]"
                                style={{
                                    backgroundImage: `url(${product.thumbnail})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition,
                                    backgroundSize: '250%',
                                }}
                            />
                        )}

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Hover to explore details</p>
                        </div>
                    </div>

                    {/* RIGHT: CONTENT */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--secondary-color)]">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[#1a1a1a] md:text-5xl">{product.title}</h1>
                        </div>

                        {/* RATING */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < Math.floor(product.rating)
                                                ? 'fill-[var(--secondary-color)] text-[var(--secondary-color)]'
                                                : 'text-gray-200'
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-gray-400">({product.reviews?.length || 0} Verified Reviews)</span>
                        </div>

                        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">{product.description}</p>

                        {/* PRICE & QTY */}
                        <div className="mb-10 flex flex-wrap items-center gap-8 border-b border-gray-100 pb-10">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-[var(--primary-color)]">৳{(product.price * count).toFixed(2)}</span>
                                {product.discountPercentage && <del className="text-lg font-bold text-gray-300">৳{product.discountPercentage}</del>}
                            </div>

                            <div className="flex items-center rounded-2xl border border-gray-100 bg-gray-50 p-1">
                                <button
                                    onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                                    className="rounded-xl p-3 shadow-sm transition-all hover:bg-white active:scale-90"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="min-w-[50px] px-6 text-center text-xl font-black">{count}</span>
                                <button
                                    onClick={() => setCount((prev) => prev + 1)}
                                    className="rounded-xl p-3 shadow-sm transition-all hover:bg-white active:scale-90"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <button className="rounded-2xl bg-[#1a1a1a] px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[var(--primary-color)] active:scale-95">
                                Add to Cart
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#128C7E] active:scale-95">
                                <MessageCircle size={18} /> WhatsApp Order
                            </button>
                        </div>

                        {/* TRUST */}
                        <div className="mt-12 flex gap-8">
                            <div className="flex items-center gap-2">
                                <Truck size={18} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Fast Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-gray-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Genuine Product</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVIEWS SECTION */}
                <div className="mt-32">
                    <div className="mb-12 flex items-center justify-between border-b border-gray-100 pb-6">
                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                            Customer <span className="text-[var(--primary-color)]">Reviews</span>
                        </h3>
                        <span className="rounded-full bg-gray-100 px-4 py-1 text-xs font-bold">{product.reviews?.length || 0} Total</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {displayReviews.map((review, index) => (
                            <div key={index} className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">{review.reviewerName}</h4>
                                        <p className="text-[10px] font-bold text-gray-400">{review.reviewerEmail}</p>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={
                                                    i < review.rating
                                                        ? 'fill-[var(--secondary-color)] text-[var(--secondary-color)]'
                                                        : 'text-gray-200'
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="italic leading-relaxed text-gray-600">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>

                    {product.reviews?.length > 1 && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setShowAllReviews((prev) => !prev)}
                                className="border-b-2 border-[#1a1a1a] pb-1 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                            >
                                {showAllReviews ? 'Show Less' : 'Read All Reviews'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </CommonLayout>
    );
}
