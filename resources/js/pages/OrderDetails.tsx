import Common from '@/Layouts/Common';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, MapPin, Package, Phone, Receipt, Truck, User } from 'lucide-react';

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

export default function OrderDetails() {
    const { order } = usePage().props as { order: Order };

    const statusSteps = [
        { label: 'Processing', value: 'processing', icon: Package },
        { label: 'Shipped', value: 'shipped', icon: Truck },
        { label: 'Complete', value: 'complete', icon: CheckCircle },
    ];

    const currentStepIndex = statusSteps.findIndex((s) => s.value === order.order_status);

    return (
        <Common header="Order Details">
            <Head title={`Order #${order.id}`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto max-w-5xl px-4">
                    {/* Top Navigation / Back Button */}
                    <Link
                        href={route('user.order')}
                        className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--secondary-color)] hover:opacity-80"
                    >
                        <ArrowLeft size={16} /> Back to Orders
                    </Link>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* LEFT COLUMN */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Status Card */}
                            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50">
                                <div className="bg-[var(--primary-color)] p-6 text-white">
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Order Reference</p>
                                            <h1 className="text-2xl font-bold italic tracking-tight">#{order.id}</h1>
                                        </div>
                                        <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                            <span className="text-sm font-medium">Status: </span>
                                            <span className="text-sm font-bold uppercase tracking-wider">{order.order_status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex justify-between p-8 pt-10">
                                    {statusSteps.map((step, idx) => {
                                        const Icon = step.icon;
                                        const isDone = idx <= currentStepIndex;
                                        return (
                                            <div key={step.label} className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`flex h-14 w-14 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                                                        isDone
                                                            ? 'border-[var(--secondary-color)] bg-[var(--secondary-color)] text-white shadow-lg'
                                                            : 'border-gray-100 bg-white text-gray-300'
                                                    }`}
                                                >
                                                    <Icon size={24} />
                                                </div>
                                                <span
                                                    className={`mt-3 text-xs font-bold uppercase tracking-tighter ${isDone ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}
                                                >
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {/* Line connector */}
                                    <div className="absolute left-0 top-[3.7rem] -z-0 h-1 w-full px-16">
                                        <div className="h-full bg-gray-100">
                                            <div
                                                className="h-full bg-[var(--secondary-color)] transition-all duration-1000"
                                                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-gray-200/50">
                                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[var(--primary-color)]">
                                    <Receipt size={22} /> Your Selection
                                </h2>
                                <div className="space-y-6">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex items-center gap-6 rounded-xl border border-transparent p-2 transition-all hover:border-gray-100 hover:bg-gray-50"
                                        >
                                            <div className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <h3 className="text-lg font-bold text-[var(--text-black)]">{item.product.name}</h3>
                                                <p className="decoration-[var(--secondary-color)]/30 text-sm font-medium text-gray-500 underline underline-offset-4">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <div className="mt-4 flex items-baseline gap-2">
                                                    <span className="text-xl font-black text-[var(--primary-color)]">
                                                        ৳{item.price * item.quantity}
                                                    </span>
                                                    <span className="text-xs font-medium text-gray-400">(@ ৳{item.price})</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-6">
                            {/* Customer Details */}
                            <div className="rounded-2xl border-t-4 border-[var(--secondary-color)] bg-white p-6 shadow-lg">
                                <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-[var(--primary-color)]">Shipping & Contact</h3>
                                <div className="space-y-5">
                                    <div className="flex gap-4">
                                        <div className="bg-[var(--primary-color)]/5 flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary-color)]">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Recipient</p>
                                            <p className="font-bold text-[var(--text-black)]">{order.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-[var(--primary-color)]/5 flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary-color)]">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Address</p>
                                            <p className="font-bold text-[var(--text-black)]">{order.shipping_address}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="bg-[var(--primary-color)]/5 flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary-color)]">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Phone</p>
                                            <p className="font-bold text-[var(--text-black)]">{order.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="rounded-2xl bg-[var(--primary-color)] p-8 text-[var(--text-white)] shadow-2xl">
                                <h3 className="mb-6 text-center text-xs font-black uppercase tracking-[0.3em]">Total Balance</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-4 text-sm font-medium text-white/70">
                                        <span>Subtotal</span>
                                        <span>৳{order.total_price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-white/70">Payment Status</span>
                                        <span className={`font-bold italic ${order.payment_info === 'Paid' ? 'text-green-400' : 'text-red-700'}`}>
                                            {order.payment_info}
                                        </span>
                                    </div>
                                    <div className="pt-4 text-center">
                                        <p className="text-[10px] uppercase tracking-widest text-white/50">Grand Total</p>
                                        <p className="text-4xl font-black italic">৳{order.total_price}</p>
                                    </div>
                                    <button className="mt-6 w-full rounded-lg bg-[var(--secondary-color)] py-4 text-xs font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-[1.02] active:scale-95">
                                        Reorder Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Common>
    );
}
