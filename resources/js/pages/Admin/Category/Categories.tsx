import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Eye, Search, Filter, X, Grid } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    color: string;
    status: 'Active' | 'Inactive';
};

interface Pagination<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: any;
}

interface Props {
    categories: Pagination<Category>;
}

export default function Categories({ categories }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        color: '#732f38',
        status: 'Active' as 'Active' | 'Inactive',
    });

    // Memoized filtering for better performance
    const filteredCategories = useMemo(() => {
        return categories.data.filter((cat) => {
            const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
            const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.id.toString().includes(searchTerm);
            return matchesStatus && matchesSearch;
        });
    }, [categories.data, searchTerm, statusFilter]);

    const openCreateModal = () => {
        reset();
        setEditingCategory(null);
        setModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            color: category.color,
            status: category.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingCategory ? put : post;
        const url = editingCategory ? route('categories.update', editingCategory.id) : route('categories.store');

        action(url, {
            onSuccess: () => {
                toast.success(`Category ${editingCategory ? 'updated' : 'created'} successfully`);
                setModalOpen(false);
                reset();
            },
            onError: () => toast.error('Check form for errors'),
        });
    };

    return (
        <AuthenticatedLayout header="Categories Inventory">
            <Head title="Categories" />

            <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* ACTION BAR */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
                    <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
                        <div className="group relative w-full sm:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[var(--primary-color)]"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="w-full rounded-xl border-none bg-gray-50 py-2 pl-10 pr-4 font-medium transition-all focus:ring-2 focus:ring-[var(--primary-color)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full sm:w-48">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select
                                className="w-full appearance-none rounded-xl border-none bg-gray-50 py-2 pl-10 pr-4 font-medium focus:ring-2 focus:ring-[var(--primary-color)]"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary-color)] px-6 py-3 font-black italic tracking-tighter text-white shadow-lg shadow-red-900/10 transition-all hover:scale-105 md:w-auto"
                    >
                        <Plus size={20} strokeWidth={3} /> ADD CATEGORY
                    </button>
                </div>

                {/* DATA TABLE */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <th className="px-8 py-5">ID</th>
                                    <th className="px-8 py-5">Category Information</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredCategories.map((cat) => (
                                    <tr key={cat.id} className="group transition-all hover:bg-gray-50/80">
                                        <td className="px-8 py-5 text-sm font-bold text-gray-400">#{cat.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="h-10 w-10 rounded-xl border-4 border-white shadow-inner ring-1 ring-gray-100"
                                                    style={{ backgroundColor: cat.color }}
                                                />
                                                <div>
                                                    <div className="text-lg font-black italic tracking-tighter text-gray-900">{cat.name}</div>
                                                    <div className="text-[10px] font-bold uppercase leading-none tracking-widest text-gray-400">
                                                        Global Category
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                                                    cat.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {cat.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('categories.show', cat.id)}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(cat)}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-500"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => confirm('Delete this category?') && destroy(route('categories.destroy', cat.id))}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCategories.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <Grid className="mx-auto mb-4 text-gray-200" size={48} />
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                                No Categories matched your criteria
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-8 py-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Showing {filteredCategories.length} Results</span>
                        <div className="flex gap-2">
                            {categories.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
                                        link.active
                                            ? 'bg-gray-900 text-white shadow-md'
                                            : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-100'
                                    } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* MODAL */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div className="animate-in fade-in zoom-in w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl duration-200">
                            <div className="flex items-center justify-between px-8 pb-4 pt-8">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
                                    {editingCategory ? 'Edit Entry' : 'New Category'}
                                </h2>
                                <button onClick={() => setModalOpen(false)} className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 p-8">
                                <div>
                                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        Label Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full rounded-2xl border-none bg-gray-50 px-5 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-[var(--primary-color)] ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                        placeholder="e.g. Footwear"
                                    />
                                    {errors.name && <p className="ml-1 mt-2 text-[10px] font-bold uppercase text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Thematic Color
                                        </label>
                                        <div className="flex items-center gap-3 rounded-2xl border border-transparent bg-gray-50 p-2 focus-within:border-[var(--primary-color)]">
                                            <input
                                                type="color"
                                                value={data.color}
                                                onChange={(e) => setData('color', e.target.value)}
                                                className="h-10 w-12 cursor-pointer overflow-hidden rounded-lg border-none bg-transparent"
                                            />
                                            <span className="font-mono text-xs font-bold text-gray-500">{data.color}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Availability
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as 'Active' | 'Inactive')}
                                            className="w-full appearance-none rounded-2xl border-none bg-gray-50 px-4 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-[var(--primary-color)]"
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
                                        className="flex-1 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-[2] rounded-2xl bg-gray-900 px-6 py-4 font-black italic tracking-tighter text-white transition-all hover:bg-[var(--primary-color)] disabled:opacity-50"
                                    >
                                        {editingCategory ? 'SAVE CHANGES' : 'CREATE ENTRY'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}