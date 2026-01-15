import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Package, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';

type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        image_url: string;
    };
};

type Order = {
    id: number;
    name: string;
    shipping_address: string;
    phone: string;
    total_price: number;
    payment_info: 'Paid' | 'Unpaid';
    order_status: 'processing' | 'shipped' | 'complete';
    items: OrderItem[];
};

export default function OrderContent() {
    const { orders } = usePage().props as { orders: Order[] };

    if (!orders || orders.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
                <ShoppingBag size={64} className="text-gray-200" />
                <p className="text-xl font-medium italic text-gray-400">You have no orders yet.</p>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest text-[var(--secondary-color)] underline underline-offset-8">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-black uppercase italic tracking-tighter text-[var(--primary-color)]">
                    My <span className="text-[var(--secondary-color)]">Orders</span>
                </h1>
                <div className="mx-auto mt-2 h-1 w-24 bg-[var(--secondary-color)]"></div>
            </header>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order) => {
                    const previewImage = order.items?.[0]?.product.image_url || '/placeholder.png';

                    return (
                        <div
                            key={order.id}
                            className="group overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={previewImage}
                                    alt={order.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Status Overlay Tags */}
                                <div className="absolute left-4 top-4 flex flex-col gap-2">
                                    <span
                                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md ${
                                            order.payment_info === 'Paid' ? 'bg-green-600/80' : 'bg-red-600/80'
                                        }`}
                                    >
                                        {order.payment_info}
                                    </span>
                                    <span
                                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md ${
                                            order.order_status === 'complete'
                                                ? 'bg-[var(--primary-color)]/80'
                                                : order.order_status === 'shipped'
                                                  ? 'bg-blue-600/80'
                                                  : 'bg-orange-500/80'
                                        }`}
                                    >
                                        {order.order_status}
                                    </span>
                                </div>

                                <div className="from-[var(--primary-color)]/80 absolute bottom-0 left-0 w-full bg-gradient-to-t to-transparent p-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">Order ID</p>
                                    <p className="text-xl font-black italic text-white">#{order.id}</p>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <h2 className="text-lg font-black leading-tight text-[var(--text-black)]">{order.name}</h2>
                                        <div className="mt-1 flex items-center gap-1 text-gray-400">
                                            <MapPin size={14} />
                                            <p className="w-40 truncate text-xs font-medium">{order.shipping_address}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-[var(--secondary-color)]">Total</p>
                                        <p className="text-xl font-black tracking-tighter text-[var(--primary-color)]">৳{order.total_price}</p>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-2 border-t border-gray-50 pt-4">
                                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <Package size={12} /> Items ({order.items.length})
                                    </p>
                                    <ul className="space-y-1">
                                        {order.items.slice(0, 2).map((item) => (
                                            <li key={item.id} className="truncate text-sm font-bold text-gray-600">
                                                <span className="text-[var(--secondary-color)]">×{item.quantity}</span> {item.product.name}
                                            </li>
                                        ))}
                                        {order.items.length > 2 && (
                                            <li className="text-xs italic text-gray-400">+ {order.items.length - 2} more items</li>
                                        )}
                                    </ul>
                                </div>

                                <Link
                                    href={route('user.order.show', order.id)}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 py-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--primary-color)] transition-all hover:bg-[var(--primary-color)] hover:text-white"
                                >
                                    Track Order <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}