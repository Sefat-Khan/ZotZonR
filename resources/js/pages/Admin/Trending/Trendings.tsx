import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Pencil,
    Trash2,
    Eye,
    Plus,
    Search,
    Filter,
    Image as ImageIcon,
    X,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Tag,
    AlertCircle,
    Edit3,
} from 'lucide-react';

type Trendings = {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_url: string;
    description: string;
    discount: number;
    status: 'Active' | 'Inactive';
};

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    trendings: Pagination<Trendings>;
    brands?: any;
    categories?: any;
}

export default function Trendings({ trendings, brands, categories }: Props) {
    const [tableData, setTableData] = useState<Trendings[]>(trendings.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTrendings, setEditingTrendings] = useState<Trendings | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        slug: '',
        image: null as File | null,
        description: '',
        discount: 0,
        status: 'Active' as 'Active' | 'Inactive',
        _method: 'POST',
    });

    const [sortField, setSortField] = useState<'id' | 'name' | 'discount'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSort = (field: 'id' | 'name' | 'discount') => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sortedData = [...tableData].sort((a, b) => {
            if (field === 'id') return order === 'asc' ? a.id - b.id : b.id - a.id;
            if (field === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (field === 'discount') return order === 'asc' ? a.discount - b.discount : b.discount - a.discount;
            return 0;
        });
        setTableData(sortedData);
    };

    const filterTrendings = tableData.filter((cat) => {
        const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
        const matchesSearch =
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(cat.discount).includes(searchTerm) ||
            cat.id.toString().includes(searchTerm);
        return matchesSearch && matchesStatus;
    });

    const openCreateModal = () => {
        reset();
        setImagePreview(null);
        setEditingTrendings(null);
        setModalOpen(true);
    };

    const openEditModal = (product: Trendings) => {
        setEditingTrendings(product);
        setData({
            name: product.name,
            slug: product.slug,
            image: null,
            description: product.description,
            discount: product.discount,
            status: product.status,
            _method: 'PUT',
        });
        setImagePreview(product.image_url);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTrendings) {
            post(route('trendings.update', editingTrendings.id), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Trending updated successfully');
                    setModalOpen(false);
                    reset();
                },
                onError: () => toast.error('Failed to update trending'),
            });
        } else {
            post(route('trendings.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Trending created successfully');
                    setModalOpen(false);
                    reset();
                },
                onError: () => toast.error('Failed to create trending'),
            });
        }
    };

    useEffect(() => {
        setTableData(trendings.data);
    }, [trendings.data]);

    useEffect(() => {
        if (data.name) {
            setData('slug', data.name.toLowerCase().replace(/\s+/g, '-'));
        } else {
            setData('slug', '');
        }
    }, [data.name]);

    return (
        <AuthenticatedLayout header="Trending Spotlight">
            <Head title="Trendings" />

            <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 antialiased sm:px-6">
                {/* --- HEADER --- */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
                    <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full rounded-xl border-none bg-gray-50 py-2.5 pl-10 pr-4 transition-all focus:ring-2 focus:ring-gray-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none rounded-xl border-none bg-gray-50 py-2.5 pl-9 pr-8 text-sm font-bold focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-black italic tracking-tighter text-white shadow-lg shadow-gray-200 transition-all hover:bg-[var(--primary-color)]"
                    >
                        <Plus size={18} /> CREATE TRENDING
                    </button>
                </div>

                {/* --- TABLE --- */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl shadow-zinc-200/50">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-separate border-spacing-0 text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th
                                        onClick={() => handleSort('id')}
                                        className="cursor-pointer px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
                                    >
                                        ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Media</th>
                                    <th
                                        onClick={() => handleSort('name')}
                                        className="cursor-pointer px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
                                    >
                                        Trending Info {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        onClick={() => handleSort('discount')}
                                        className="cursor-pointer px-6 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-black"
                                    >
                                        Offer {sortField === 'discount' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        Visibility
                                    </th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filterTrendings.map((cat) => (
                                    <tr key={cat.id} className="group transition-colors hover:bg-gray-50/50">
                                        <td className="px-8 py-6 font-mono text-xs font-bold text-gray-400">#{cat.id}</td>
                                        <td className="px-6 py-6">
                                            <div className="h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-gray-100 transition-transform duration-300 group-hover:scale-110">
                                                <img src={cat.image_url} alt={cat.name} className="h-full w-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-black uppercase italic tracking-tighter text-gray-900">{cat.name}</span>
                                                <span className="max-w-[150px] truncate text-[10px] font-medium text-gray-400">
                                                    {cat.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1 text-xs font-black text-rose-600">
                                                <Tag size={12} />
                                                {cat.discount}% OFF
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                                                    cat.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${cat.status === 'Active' ? 'animate-pulse bg-emerald-600' : 'bg-gray-400'}`}
                                                />
                                                {cat.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Link
                                                    href={route('trendings.show', cat)}
                                                    className="rounded-lg p-2 text-gray-400 shadow-sm transition-all hover:bg-white hover:text-gray-900"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(cat)}
                                                    className="rounded-lg p-2 text-gray-400 shadow-sm transition-all hover:bg-white hover:text-blue-600"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => confirm('Delete Product?') && destroy(route('trendings.destroy', cat.id))}
                                                    className="rounded-lg p-2 text-gray-400 shadow-sm transition-all hover:bg-white hover:text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filterTrendings.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <AlertCircle size={40} strokeWidth={1} className="mb-4" />
                                <p className="font-bold">No results found for "{searchTerm}"</p>
                            </div>
                        )}
                    </div>

                    {/* --- PAGINATION --- */}
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/50 px-8 py-6 sm:flex-row">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                            Powering {trendings.meta?.total || filterTrendings.length} campaigns
                        </span>
                        <div className="flex gap-2">
                            {trendings.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-3 text-[10px] font-black transition-all ${
                                        link.active
                                            ? 'scale-110 bg-black text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-400 hover:border-gray-900 hover:text-black'
                                    } ${!link.url ? 'pointer-events-none opacity-20' : ''} `}
                                >
                                    {link.label.includes('Next') ? (
                                        <ChevronRight size={14} strokeWidth={3} />
                                    ) : link.label.includes('Prev') ? (
                                        <ChevronLeft size={14} strokeWidth={3} />
                                    ) : (
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setModalOpen(false)} />
                    <div className="animate-in zoom-in relative w-full max-w-xl overflow-hidden rounded-[3rem] bg-white shadow-2xl duration-200">
                        <div className="p-8 sm:p-12">
                            <div className="mb-10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black leading-none tracking-tight text-gray-900">
                                        {editingTrendings ? 'Refine Campaign' : 'New Trend'}
                                    </h2>
                                    <p className="mt-2 text-xs font-bold uppercase italic tracking-widest text-gray-400">All fields are monitored</p>
                                </div>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="rounded-2xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Display Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`mt-2 w-full rounded-2xl border-none bg-gray-50 px-5 py-4 text-sm font-bold transition-all focus:ring-2 focus:ring-black ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                            placeholder="e.g. Summer Pulse"
                                        />
                                        {errors.name && (
                                            <p className="ml-1 mt-1 text-[10px] font-bold uppercase tracking-tighter text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">URL Slug</label>
                                        <input
                                            type="text"
                                            value={data.slug}
                                            readOnly
                                            className="mt-2 w-full cursor-not-allowed rounded-2xl border-none bg-gray-100/50 px-5 py-4 text-sm font-bold text-gray-500"
                                            placeholder="auto-generated"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Visual Asset</label>
                                        <label
                                            className={`relative mt-2 h-44 w-full rounded-[2rem] border-2 border-dashed bg-gray-50 ${imagePreview ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-200'} group flex cursor-pointer flex-col items-center justify-center overflow-hidden transition-all hover:border-black`}
                                        >
                                            {imagePreview ? (
                                                <img src={imagePreview} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="text-center">
                                                    <div className="mb-3 inline-flex rounded-2xl bg-white p-3 text-gray-300 shadow-sm transition-colors group-hover:text-black">
                                                        <ImageIcon size={24} />
                                                    </div>
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">
                                                        Upload Product Art
                                                    </span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData('image', file);
                                                        setImagePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </label>
                                        {errors.image && <p className="ml-1 mt-1 text-[10px] font-bold uppercase text-red-500">{errors.image}</p>}
                                    </div>

                                    <div className="col-span-2">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Campaign Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={2}
                                            className="mt-2 w-full resize-none rounded-2xl border-none bg-gray-50 px-5 py-4 text-sm font-medium transition-all focus:ring-2 focus:ring-black"
                                            placeholder="Tell the story..."
                                        />
                                    </div>

                                    <div>
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Incentive %</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={data.discount ?? ''}
                                                onChange={(e) => setData('discount', Number(e.target.value))}
                                                className="mt-2 w-full rounded-2xl border-none bg-gray-50 px-5 py-4 text-sm font-bold transition-all focus:ring-2 focus:ring-black"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-[-2px] font-black text-gray-300">%</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Live Status</label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as any)}
                                            className="mt-2 w-full cursor-pointer appearance-none rounded-2xl border-none bg-gray-50 px-5 py-4 text-sm font-bold transition-all focus:ring-2 focus:ring-black"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="flex-1 rounded-2xl bg-gray-100 py-4 text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-200"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-[2] rounded-2xl bg-black py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:bg-zinc-800 active:scale-95 disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : editingTrendings ? 'Update Pulse' : 'Launch Campaign'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}