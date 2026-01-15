import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Phone, MapPin, CreditCard, Box, Package } from 'lucide-react';

export default function Preview() {
    const { order } = usePage().props as {
        order: {
            id: number;
            name: string;
            phone: string;
            shipping_address: string;
            total_price: number;
            payment_info: 'Paid' | 'Unpaid';
            order_status: 'processing' | 'shipped' | 'complete';
            created_at: string;
            items: {
                id: number;
                quantity: number;
                price: number;
                product: {
                    id: number;
                    name: string;
                    image_url: string;
                };
            }[];
        };
    };

    return (
        <AuthenticatedLayout header="Order Details">
            <Head title={`Order #${order.id}`} />

            <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                                <Package className="text-black" size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-gray-900">Order #{order.id}</h1>
                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={14} />
                                    <span>
                                        Placed on{' '}
                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route('orders.index')}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95"
                        >
                            <ArrowLeft size={16} />
                            Back to Orders
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column: Order Items */}
                        <div className="space-y-6 lg:col-span-2">
                            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                                <div className="border-b border-gray-50 px-8 py-5">
                                    <h3 className="flex items-center gap-2 font-bold text-gray-900">
                                        <Box size={18} className="text-gray-400" />
                                        Order Contents
                                    </h3>
                                </div>
                                <div className="divide-y divide-gray-50 px-8">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="group flex items-center gap-6 py-6">
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100">
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <span className="text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                    {item.product.name}
                                                </span>
                                                <span className="mt-1 text-xs text-gray-400">Unit Price: ৳{item.price}</span>
                                                <div className="mt-2 inline-flex w-fit items-center rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    Qty: {item.quantity}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900">৳{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between bg-gray-50/50 px-8 py-6">
                                    <span className="font-medium text-gray-500">Grand Total</span>
                                    <span className="text-3xl font-black text-green-600">৳{order.total_price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Customer & Shipping Info */}
                        <div className="space-y-6">
                            {/* Status Card */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Order Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Fulfillment</span>
                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter ${
                                                order.order_status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Payment</span>
                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter ${
                                                order.payment_info === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                                            }`}
                                        >
                                            {order.payment_info}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Customer Info</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 rounded-lg bg-blue-50 p-2 text-blue-600">
                                            <Phone size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{order.name}</p>
                                            <p className="text-xs text-gray-500">{order.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 border-t border-gray-50 pt-6">
                                        <div className="mt-1 rounded-lg bg-amber-50 p-2 text-amber-600">
                                            <MapPin size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Shipping Address</p>
                                            <p className="mt-1 text-sm leading-relaxed text-gray-600">{order.shipping_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}