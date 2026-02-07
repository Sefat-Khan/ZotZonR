import { useCart } from '@/context/CartContext';
import { MessageCircle, Minus, Plus, RefreshCw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ProductCart({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%', backgroundImage: 'null', backgroundSize: '0%' });
    const { addToCart } = useCart();
    const imageRef = useRef(null);

    const price = product.final_price;
    const totalPrice = (price * quantity).toFixed(2);

    const whatsappMessage = encodeURIComponent(
        `Hi, I am interested in this product:\n\n` +
            `📦 *${product.name}*\n` +
            `💰 Price: ৳${price}\n` +
            `🔢 Quantity: ${quantity}\n` +
            `💵 Total: ৳${totalPrice}\n\n` +
            `Please let me know the delivery process.`,
    );

    // --- ZOOM LOGIC ---
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;

        setZoomStyle({
            display: 'block',
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${product.image_url})`,
            backgroundSize: '250%', // Adjust this number for zoom level
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none', backgroundPosition: '0% 0%', backgroundImage: 'null', backgroundSize: '0%' });
    };

    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
                {/* LEFT: IMAGE SECTION WITH ZOOM */}
                <div className="space-y-4">
                    <div
                        className="relative cursor-zoom-in overflow-hidden rounded-[2.5rem] bg-[#F3F3F3]"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Base Image */}
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className={`aspect-[4/5] w-full object-contain p-8 transition-opacity duration-300 ${zoomStyle.display === 'block' ? 'opacity-0' : 'opacity-100'}`}
                        />

                        {/* Zoom Overlay Layer */}
                        <div
                            className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out"
                            style={{
                                ...zoomStyle,
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </div>

                    <p className="animate-pulse text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Move mouse over image to zoom
                    </p>
                </div>

                {/* RIGHT: PRODUCT INFO */}
                <div className="flex flex-col">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{product.brand?.name || 'Original'}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary-color)]">
                            {product.category?.name}
                        </span>
                    </div>

                    <h1 className="mb-6 text-4xl font-black uppercase italic tracking-tighter text-[#1a1a1a] md:text-5xl">{product.name}</h1>

                    <div className="mb-8 flex items-baseline gap-4">
                        <span className="text-4xl font-black text-[var(--primary-color)]">৳{price}</span>
                        {product.price > price && (
                            <>
                                <del className="text-xl font-bold text-gray-300">৳{product.price}</del>
                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black uppercase text-red-600">
                                    Save {Math.round(((product.price - price) / product.price) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    <p className="mb-10 border-l-4 border-gray-100 pl-6 text-lg leading-relaxed text-gray-600">{product.description}</p>

                    {/* CONFIGURATOR */}
                    <div className="mb-10 space-y-8">
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Quantity</span>
                            <div className="flex w-fit items-center rounded-2xl bg-gray-100 p-1">
                                <button
                                    onClick={decreaseQty}
                                    className="rounded-xl p-3 shadow-sm transition-all hover:bg-white hover:text-[var(--primary-color)] active:scale-90"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="min-w-[60px] px-8 text-center text-xl font-black">{quantity}</span>
                                <button
                                    onClick={increaseQty}
                                    className="rounded-xl p-3 shadow-sm transition-all hover:bg-white hover:text-[var(--primary-color)] active:scale-90"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-end justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
                                <span className="text-2xl font-black text-[#1a1a1a]">৳{totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <button
                            onClick={() => addToCart(product, quantity, totalPrice)}
                            className="flex items-center justify-center gap-3 rounded-2xl bg-[#1a1a1a] px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-xl active:scale-95"
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>

                        <a
                            href={`https://wa.me/${product.whatsapp_id}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#128C7E] hover:shadow-xl active:scale-95"
                        >
                            <MessageCircle size={18} />
                            WhatsApp Order
                        </a>
                    </div>

                    {/* TRUST BADGES */}
                    <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-10">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="rounded-full bg-gray-50 p-3 text-gray-400">
                                <Truck size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="rounded-full bg-gray-50 p-3 text-gray-400">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">100% Genuine</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="rounded-full bg-gray-50 p-3 text-gray-400">
                                <RefreshCw size={20} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tighter">Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
