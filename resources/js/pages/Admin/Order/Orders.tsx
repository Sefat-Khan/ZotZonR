import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Pencil, Trash2, Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

type OrderItem = {
    id: number;
    product: {
        id: number;
        name: string;
        image_url: string;
    };
    quantity: number;
    price: number;
};

type Orders = {
    id: number;
    name: string;
    phone: string;
    shipping_address: string;
    user_id: number | null;
    total_price: number;
    payment_info: 'Paid' | 'Unpaid';
    order_status: 'Processing' | 'Shipped' | 'Complete';
    status: 'Active' | 'Inactive';
    items: OrderItem[];
};

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    orders: Pagination<Orders>;
}

export default function Orders({ orders }: Props) {
    const [tableData, setTableData] = useState<Orders[]>(orders.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOrders, setEditingOrders] = useState<Orders | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slug, setSlug] = useState('');

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        shipping_address: '',
        user_id: null as number | null,
        phone: '',
        total_price: 0,
        payment_info: 'All' as 'Unpaid' | 'Paid',
        order_status: 'All' as 'Processing' | 'Shipped' | 'Complete',
        status: 'Active' as 'Active' | 'Inactive',
        _method: 'POST',
    });

    const [sortField, setSortField] = useState<'id' | 'name' | 'user_id' | 'total_price'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
    const [paymentInfoFilter, setPaymentInfoFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSort = (field: 'id' | 'name' | 'user_id' | 'total_price') => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedData = [...tableData].sort((a, b) => {
            if (field === 'id') return order === 'asc' ? a.id - b.id : b.id - a.id;
            if (field === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (field === 'user_id') {
                return order === 'asc' ? (a.user_id ?? 0) - (b.user_id ?? 0) : (b.user_id ?? 0) - (a.user_id ?? 0);
            }
            if (field === 'total_price') return order === 'asc' ? a.total_price - b.total_price : b.total_price - a.total_price;
        });
        setTableData(sortedData);
    };

    const filterOrders = tableData.filter((order) => {
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const matchesOrderStatus = orderStatusFilter === 'All' || order.order_status.toLocaleLowerCase() === orderStatusFilter.toLocaleLowerCase();
        const matchesPaymentInfo = paymentInfoFilter === 'All' || order.payment_info === paymentInfoFilter;
        const matchesSearch =
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toString().includes(searchTerm) ||
            order.items.some((item) => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesStatus && matchesOrderStatus && matchesPaymentInfo && matchesSearch;
    });

    const openEditModal = (order: Orders) => {
        setEditingOrders(order);
        setData({
            name: order.name,
            shipping_address: order.shipping_address,
            user_id: order.user_id,
            phone: order.phone,
            total_price: order.total_price,
            payment_info: order.payment_info,
            order_status: order.order_status,
            status: order.status,
            _method: 'PUT',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOrders) {
            post(route('orders.update', editingOrders.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Order updated successfully');
                    setModalOpen(false);
                    reset();
                },
                onError: () => {
                    toast.error('Failed to update order. Please check the form for errors.');
                },
            });
        }
    };

    useEffect(() => {
        setTableData(orders.data);
    }, [orders.data]);

    return (
        <AuthenticatedLayout header="orders">
            <Head title="Orders" />

            <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* TOP CONTROLS */}
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    className="w-full rounded-xl border-gray-200 py-2 pl-9 pr-4 text-sm shadow-sm focus:border-black focus:ring-black md:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <select
                                className="rounded-xl border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <select
                                className="rounded-xl border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black"
                                value={orderStatusFilter}
                                onChange={(e) => setOrderStatusFilter(e.target.value)}
                            >
                                <option value="All">All Progress</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Complete">Complete</option>
                            </select>

                            <select
                                className="rounded-xl border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black"
                                value={paymentInfoFilter}
                                onChange={(e) => setPaymentInfoFilter(e.target.value)}
                            >
                                <option value="All">Payment: All</option>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th
                                            className="cursor-pointer px-6 py-4 text-xs font-bold uppercase text-gray-500"
                                            onClick={() => handleSort('id')}
                                        >
                                            ID {sortField === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th
                                            className="cursor-pointer px-6 py-4 text-xs font-bold uppercase text-gray-500"
                                            onClick={() => handleSort('name')}
                                        >
                                            Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Items</th>
                                        <th
                                            className="cursor-pointer px-6 py-4 text-xs font-bold uppercase text-gray-500"
                                            onClick={() => handleSort('total_price')}
                                        >
                                            Total {sortField === 'total_price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Payment</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filterOrders.map((cat) => (
                                        <tr key={cat.id} className="group transition-colors hover:bg-gray-50/50">
                                            <td className="px-6 py-4 text-sm text-gray-500">#{cat.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{cat.name}</div>
                                                <div className="text-xs text-gray-400">{cat.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {cat.items.length > 0 && (
                                                    <div className="inline-block max-w-[150px] truncate rounded bg-gray-100 px-2 py-1 text-xs">
                                                        {cat.items[0].product.name} × {cat.items[0].quantity}
                                                        {cat.items.length > 1 && '...'}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900">৳{cat.total_price}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                                        cat.payment_info === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {cat.payment_info}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                                        cat.order_status.toLocaleLowerCase() === 'complete'
                                                            ? 'bg-emerald-500 text-white'
                                                            : cat.order_status.toLocaleLowerCase() === 'processing'
                                                              ? 'bg-amber-400 text-white'
                                                              : 'bg-blue-500 text-white'
                                                    }`}
                                                >
                                                    {cat.order_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={route('orders.show', cat.id)}
                                                        className="p-2 text-gray-400 transition-colors hover:text-gray-900"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => openEditModal(cat)}
                                                        className="p-2 text-gray-400 transition-colors hover:text-blue-600"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => confirm('Delete this Brands?') && destroy(route('orders.destroy', cat.id))}
                                                        className="p-2 text-gray-400 transition-colors hover:text-red-600"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-50 bg-gray-50/30 px-8 py-6 sm:flex-row">
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    Showing <span className="text-gray-900">{orders.data.length}</span> of{' '}
                                    <span className="text-gray-900">{orders.meta?.total || orders.data.length}</span> Orders
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {orders.links.map((link, i) => {
                                        // Check if it's the "Previous" or "Next" label to replace with icons
                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');

                                        return (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 text-[10px] font-black transition-all ${
                                                    link.active
                                                        ? 'z-10 scale-110 bg-gray-900 text-white shadow-lg shadow-gray-200'
                                                        : 'border border-gray-100 bg-white text-gray-400 hover:text-gray-900 hover:shadow-md'
                                                } ${!link.url ? 'cursor-not-allowed opacity-30' : ''} `}
                                                dangerouslySetInnerHTML={{
                                                    __html: isPrev ? '←' : isNext ? '→' : link.label,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="px-8 pb-4 pt-8">
                            <h2 className="text-xl font-bold">{editingOrders ? 'Edit Order' : 'Create Order'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto px-8 py-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400">Customer Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className={`mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400">Phone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400">Payment</label>
                                    <select
                                        value={data.payment_info}
                                        onChange={(e) => setData('payment_info', e.target.value as any)}
                                        className="mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    >
                                        <option value="Unpaid">Unpaid</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-gray-400">Shipping Address</label>
                                <textarea
                                    value={data.shipping_address}
                                    onChange={(e) => setData('shipping_address', e.target.value)}
                                    className="mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400">Order Status</label>
                                    <select
                                        value={data.order_status}
                                        onChange={(e) => setData('order_status', e.target.value as any)}
                                        className="mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData({ ...data, status: e.target.value as any })}
                                        className="mt-1 w-full rounded-xl border-gray-200 focus:border-black focus:ring-black"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end gap-3 bg-gray-50 p-8">
                            <button type="button" onClick={() => setModalOpen(false)} className="text-sm font-bold text-gray-400 hover:text-gray-600">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="rounded-xl bg-black px-8 py-3 text-sm font-bold text-white shadow-xl shadow-gray-200 transition-transform hover:scale-[1.02] disabled:opacity-50"
                            >
                                {editingOrders ? 'Update Order' : 'Create Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}