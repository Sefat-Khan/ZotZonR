import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Eye,
    ChevronUp,
    ChevronDown,
    Package,
    Image as ImageIcon,
    Tag,
    DollarSign,
    X,
    UploadCloud,
    Smartphone,
} from 'lucide-react';

type Products = {
    id: number;
    name: string;
    slug: string;
    phone: string;
    image: string;
    image_url: string;
    description: string;
    price: number;
    discount_price: number;
    status: 'Active' | 'Inactive';
    brand_id: number;
    category_id: number;
    brand: { id: number; name: string };
    category: { id: number; name: string };
};

type Brand = { id: number; name: string };
type Category = { id: number; name: string };

interface Pagination<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: any;
}

interface Props {
    products: Pagination<Products>;
    brands: Brand[];
    categories: Category[];
}

export default function Products({ products, brands, categories }: Props) {
    const [tableData, setTableData] = useState<Products[]>(products.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProducts, setEditingProducts] = useState<Products | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        name: '',
        slug: '',
        phone: '012345678912',
        image: null as File | null,
        description: '',
        price: 0,
        discount_price: 0,
        brand_id: null as number | null,
        category_id: null as number | null,
        status: 'Active' as 'Active' | 'Inactive',
        _method: 'POST' as 'POST' | 'PUT',
    });

    const [sortField, setSortField] = useState<'id' | 'name' | 'price' | 'discount_price' | 'brand' | 'category'>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Update table data when props change
    useEffect(() => {
        setTableData(products.data);
    }, [products.data]);

    // Auto-generate slug
    useEffect(() => {
        setData(
            'slug',
            data.name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, ''),
        );
    }, [data.name]);

    const handleSort = (field: typeof sortField) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);

        const sorted = [...tableData].sort((a, b) => {
            let valA: any = field === 'brand' ? a.brand.name : field === 'category' ? a.category.name : a[field];
            let valB: any = field === 'brand' ? b.brand.name : field === 'category' ? b.category.name : b[field];

            if (typeof valA === 'string') return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            return order === 'asc' ? valA - valB : valB - valA;
        });
        setTableData(sorted);
    };

    const filteredProducts = tableData.filter((p) => {
        const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            p.name.toLowerCase().includes(search) || p.brand.name.toLowerCase().includes(search) || p.id.toString().includes(search);
        return matchesSearch && matchesStatus;
    });

    const openCreateModal = () => {
        setEditingProducts(null);

        setData({
            name: '',
            slug: '',
            phone: '012345678912',
            image: null,
            description: '',
            price: 0,
            discount_price: 0,
            brand_id: null,
            category_id: null,
            status: 'Active',
            _method: 'POST',
        });

        setImagePreview(null);
        setModalOpen(true);
    };

    const openEditModal = (product: Products) => {
        setEditingProducts(product);
        setData({
            name: product.name,
            slug: product.slug,
            phone: product.phone,
            image: null,
            description: product.description,
            price: product.price,
            discount_price: product.discount_price,
            status: product.status,
            brand_id: product.brand_id,
            category_id: product.category_id,
            _method: 'PUT',
        });
        setImagePreview(product.image_url);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingProducts ? route('products.update', editingProducts) : route('products.store');

        post(url, {
            forceFormData: true,
            onSuccess: () => {
                toast.success(`Product ${editingProducts ? 'updated' : 'created'}!`);
                setModalOpen(false);
            },
            onError: () => toast.error('Check form for errors'),
        });
    };

    return (
        <AuthenticatedLayout header="Product Management">
            <Head title="Inventory" />

            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Dashboard Controls */}
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
                        <Plus size={18} /> CREATE PRODUCT
                    </button>
                </div>

                {/* Table Layout */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <SortHeader label="ID" field="id" current={sortField} order={sortOrder} onSort={handleSort} />
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Preview</th>
                                    <SortHeader label="Product" field="name" current={sortField} order={sortOrder} onSort={handleSort} />
                                    <SortHeader label="Price" field="price" current={sortField} order={sortOrder} onSort={handleSort} />
                                    <th className="px-6 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        Brand/Cat
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.map((p) => (
                                    <tr key={p.id} className="group transition-colors hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">#{p.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 transition-transform group-hover:scale-110">
                                                <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-black uppercase italic tracking-tighter text-gray-900">{p.name}</span>
                                                <span className="max-w-[150px] truncate text-[10px] font-medium text-gray-400">{p.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col leading-none">
                                                <span className="text-sm font-black text-gray-900">${p.price}</span>
                                                {p.discount_price > 0 && (
                                                    <span className="mt-1 text-[10px] font-bold text-emerald-500">-{p.discount_price}% OFF</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="rounded bg-gray-100 px-2 py-0.5 text-[9px] font-black uppercase text-gray-500">
                                                    {p.brand.name}
                                                </span>
                                                <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-black uppercase text-blue-500">
                                                    {p.category.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                                                    p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                }`}
                                            >
                                                <div className={`h-1 w-1 rounded-full ${p.status === 'Active' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                                                {p.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                <Link
                                                    href={route('products.show', p)}
                                                    className="rounded-lg p-2 text-gray-400 shadow-sm transition-all hover:bg-white hover:text-gray-900"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(p)}
                                                    className="rounded-lg p-2 text-gray-400 shadow-sm transition-all hover:bg-white hover:text-blue-600"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => confirm('Delete Product?') && destroy(route('products.destroy', p))}
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
                        {/* Pagination */}
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-50 bg-gray-50/30 px-8 py-6 sm:flex-row">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Showing <span className="text-gray-900">{products.data.length}</span> of{' '}
                                <span className="text-gray-900">{products.meta?.total || products.data.length}</span> Products
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {products.links.map((link, i) => {
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

            {/* Redesigned Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-10 py-8">
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
                                    {editingProducts ? 'Refine Product' : 'New Entry'}
                                </h2>
                                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Inventory System</p>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="rounded-full p-2 transition-colors hover:bg-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 space-y-8 overflow-y-auto p-10">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField label="Product Name" error={errors.name}>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="form-input-modern"
                                        placeholder="e.g. iPhone 15 Pro"
                                    />
                                </FormField>

                                <FormField label="Slug (Auto)" error={errors.slug}>
                                    <input type="text" value={data.slug} readOnly className="form-input-modern bg-gray-50 text-gray-400" />
                                </FormField>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <FormField label="Brand" icon={<Tag size={14} />} error={errors.brand_id}>
                                    <select
                                        value={data.brand_id ?? ''}
                                        onChange={(e) => setData('brand_id', Number(e.target.value))}
                                        className="form-input-modern"
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField label="Category" icon={<Package size={14} />} error={errors.category_id}>
                                    <select
                                        value={data.category_id ?? ''}
                                        onChange={(e) => setData('category_id', Number(e.target.value))}
                                        className="form-input-modern"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>

                            <FormField label="Description" error={errors.description}>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="form-input-modern"
                                    placeholder="Key features..."
                                />
                            </FormField>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <FormField label="Base Price" icon={<DollarSign size={14} />} error={errors.price}>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', Number(e.target.value))}
                                        className="form-input-modern"
                                    />
                                </FormField>
                                <FormField label="Discount %" error={errors.discount_price}>
                                    <input
                                        type="number"
                                        value={data.discount_price}
                                        onChange={(e) => setData('discount_price', Number(e.target.value))}
                                        className="form-input-modern"
                                    />
                                </FormField>
                                <FormField label="Status" error={errors.status}>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as any)}
                                        className="form-input-modern"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </FormField>
                            </div>

                            <div className="space-y-4">
                                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <ImageIcon size={14} /> Visual Media
                                </span>
                                <label className="group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-gray-100 transition-all hover:bg-gray-50">
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} className="absolute inset-0 h-full w-full object-cover opacity-20" alt="" />
                                            <div className="relative z-10 flex flex-col items-center">
                                                <UploadCloud className="mb-2 text-gray-900" />
                                                <span className="text-xs font-black uppercase italic tracking-tighter">Replace Artwork</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <UploadCloud className="mb-2 text-gray-300 transition-colors group-hover:text-gray-900" size={32} />
                                            <span className="text-xs font-black uppercase italic tracking-tighter text-gray-400">
                                                Upload Product Media
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
                            </div>

                            <div className="flex justify-end gap-3 border-t border-gray-50 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-8 py-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-gray-900 px-10 py-3 font-black uppercase italic tracking-tighter text-white shadow-xl shadow-gray-200 transition-all hover:bg-[var(--primary-color)]"
                                >
                                    {editingProducts ? 'Save Changes' : 'Confirm & Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .form-input-modern {
                    width: 100%;
                    background: #f9fafb;
                    border: none;
                    border-radius: 1rem;
                    padding: 0.75rem 1rem;
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                .form-input-modern:focus {
                    background: white;
                    ring: 2px;
                    ring-color: #111827;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}

function SortHeader({ label, field, current, order, onSort }: any) {
    return (
        <th className="group cursor-pointer px-6 py-5" onClick={() => onSort(field)}>
            <div className="flex items-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900">{label}</span>
                {current === field && (order === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
            </div>
        </th>
    );
}

function FormField({ label, icon, error, children }: any) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                {icon} {label}
            </label>
            {children}
            {error && <p className="mt-1 text-[10px] font-bold uppercase text-red-500">{error}</p>}
        </div>
    );
}