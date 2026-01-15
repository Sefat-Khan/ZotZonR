import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ShoppingBag, CreditCard, MapPin, User, Phone, CheckCircle2, Loader2 } from 'lucide-react';

export default function CheckoutContent() {
    const { cart, setCart, setOpenCart } = useCart();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

    const subtotal = cart.reduce((sum, item) => sum + Number(item.totalPrice), 0);

    const handlePlaceOrder = () => {
        if (loading) return;

        const newErrors: { name?: string; phone?: string; address?: string } = {};
        if (!name.trim()) newErrors.name = 'Full name is required';
        if (!phone.trim()) newErrors.phone = 'Phone number is required';
        if (!address.trim()) newErrors.address = 'Shipping address is required';

        if (cart.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error('Please fill in all required fields');
            return;
        }

        setErrors({});
        setLoading(true);
        const toastId = toast.loading('Processing your order...');

        router.post(
            route('orders.store'),
            {
                name,
                phone,
                shipping_address: address,
                total_price: subtotal,
                payment_info: 'Unpaid',
                order_status: 'processing',
                cart,
            },
            {
                onSuccess: () => {
                    toast.success('Order placed successfully! 🎉', { id: toastId });
                    setCart([]);
                    localStorage.removeItem('cart');
                    setOpenCart(false);
                    setName('');
                    setPhone('');
                    setAddress('');
                    router.visit(route('user.order'));
                },
                onError: () => {
                    toast.error('Failed to place order. Please try again.', { id: toastId });
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-16">
            <header className="mb-12">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[var(--primary-color)]">
                    Finalize <span className="text-[var(--secondary-color)]">Order</span>
                </h1>
                <div className="mt-2 h-1 w-20 bg-[var(--secondary-color)]"></div>
            </header>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {/* LEFT: Order Summary */}
                <div className="space-y-8 lg:col-span-7">
                    <div className="rounded-[2rem] border border-gray-50 bg-white p-8 shadow-2xl shadow-gray-200/50">
                        <div className="mb-6 flex items-center gap-3">
                            <ShoppingBag className="text-[var(--secondary-color)]" size={24} />
                            <h2 className="text-xl font-bold uppercase tracking-tight text-[var(--primary-color)]">Your Basket</h2>
                        </div>

                        {cart.length === 0 ? (
                            <div className="py-10 text-center">
                                <p className="italic text-gray-400">Your cart is currently empty.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-gray-50 py-4 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={item.image} className="h-16 w-16 rounded-2xl object-cover shadow-sm" alt={item.name} />
                                                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary-color)] text-[10px] font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-bold leading-tight text-gray-800">{item.name}</p>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">৳{item.price} per unit</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-[var(--primary-color)]">৳{item.totalPrice}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-[2rem] border border-dashed border-gray-200 bg-gray-50 p-8">
                        <div className="mb-2 flex items-center gap-3 text-gray-500">
                            <CheckCircle2 size={18} />
                            <p className="text-sm font-bold uppercase tracking-widest">Quality Assurance</p>
                        </div>
                        <p className="text-sm text-gray-400">
                            Our team carefully inspects every item in your basket to ensure farm-fresh quality before dispatch.
                        </p>
                    </div>
                </div>

                {/* RIGHT: Billing Details */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 rounded-[2rem] border border-gray-50 bg-white p-8 shadow-2xl shadow-gray-200/50">
                        <div className="mb-8 flex items-center gap-3">
                            <CreditCard className="text-[var(--secondary-color)]" size={24} />
                            <h2 className="text-xl font-bold uppercase tracking-tight text-[var(--primary-color)]">Checkout</h2>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-1">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setErrors((p) => ({ ...p, name: undefined }));
                                        }}
                                        className={`w-full rounded-xl border-transparent bg-gray-50 py-4 pl-12 pr-4 font-medium outline-none transition-all focus:bg-white focus:ring-2 ${errors.name ? 'bg-red-50 ring-2 ring-red-500' : 'focus:ring-[var(--secondary-color)]'}`}
                                    />
                                </div>
                                {errors.name && <p className="ml-2 text-[10px] font-black uppercase tracking-widest text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            setErrors((p) => ({ ...p, phone: undefined }));
                                        }}
                                        className={`w-full rounded-xl border-transparent bg-gray-50 py-4 pl-12 pr-4 font-medium outline-none transition-all focus:bg-white focus:ring-2 ${errors.phone ? 'bg-red-50 ring-2 ring-red-500' : 'focus:ring-[var(--secondary-color)]'}`}
                                    />
                                </div>
                                {errors.phone && <p className="ml-2 text-[10px] font-black uppercase tracking-widest text-red-500">{errors.phone}</p>}
                            </div>

                            <div className="space-y-1">
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Delivery Address"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            setErrors((p) => ({ ...p, address: undefined }));
                                        }}
                                        className={`w-full rounded-xl border-transparent bg-gray-50 py-4 pl-12 pr-4 font-medium outline-none transition-all focus:bg-white focus:ring-2 ${errors.address ? 'bg-red-50 ring-2 ring-red-500' : 'focus:ring-[var(--secondary-color)]'}`}
                                    />
                                </div>
                                {errors.address && (
                                    <p className="ml-2 text-[10px] font-black uppercase tracking-widest text-red-500">{errors.address}</p>
                                )}
                            </div>

                            <div className="mt-10 space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
                                    <span className="font-bold text-gray-800">৳{subtotal}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Delivery</span>
                                    <span className="text-xs font-bold uppercase text-green-600">Calculated at Step 2</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-xl font-black uppercase italic tracking-tighter text-[var(--primary-color)]">Total</span>
                                    <span className="text-2xl font-black italic tracking-tighter text-[var(--primary-color)]">৳{subtotal}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={handlePlaceOrder}
                                className={`flex w-full items-center justify-center gap-3 rounded-full py-5 font-black uppercase tracking-[0.2em] shadow-xl transition-all ${
                                    loading
                                        ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                        : 'shadow-maroon-900/20 bg-[var(--primary-color)] text-white hover:scale-[1.02] hover:bg-[var(--secondary-color)] active:scale-95'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Processing
                                    </>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                            <p className="px-6 text-center text-[10px] font-medium leading-relaxed text-gray-400">
                                By clicking "Place Order", you agree to our terms of service and freshness guarantee.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}