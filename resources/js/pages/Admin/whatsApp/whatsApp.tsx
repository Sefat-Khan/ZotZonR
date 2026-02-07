import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Eye, Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

type WhatsApp = {
    id: number;
    phone: string;
    status: 'Active' | 'Inactive';
    created_at: string;
};

interface Pagination<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: any;
}

interface Props {
    whatsApp: Pagination<WhatsApp>;
}

export default function WhatsApp({ whatsApp }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingWhatsApp, setEditingWhatsApp] = useState<WhatsApp | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    const {
        data,
        setData,
        put,
        post,
        delete: destroy,
        reset,
        processing,
        errors,
    } = useForm({
        phone: '01234567891',
        status: 'Active' as 'Active' | 'Inactive',
    });

    // Optimized Filter + Search using useMemo
    const filteredWhatsApp = useMemo(() => {
        return whatsApp.data.filter((whatsApp) => {
            const matchesStatus = statusFilter === 'All' || whatsApp.status === statusFilter;
            const matchesSearch = whatsApp.phone.toLowerCase().includes(searchTerm.toLowerCase()) || whatsApp.id.toString().includes(searchTerm);
            return matchesSearch && matchesStatus;
        });
    }, [whatsApp.data, searchTerm, statusFilter]);

    const openCreateModal = () => {
        reset();
        setEditingWhatsApp(null);
        setModalOpen(true);
    };

    const openEditModal = (whatsApp: WhatsApp) => {
        setEditingWhatsApp(whatsApp);
        setData({
            phone: whatsApp.phone,
            status: whatsApp.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = editingWhatsApp ? put : post;
        const url = editingWhatsApp ? route('whatsApp.update', editingWhatsApp.id) : route('whatsApp.store');

        action(url, {
            onSuccess: () => {
                toast.success(`WhatsApp ${editingWhatsApp ? 'updated' : 'created'} successfully`);
                setModalOpen(false);
                reset();
            },
            onError: () => toast.error('Something went wrong'),
        });
    };

    return (
        <AuthenticatedLayout header="WhatsApp Management">
            <Head title="WhatsApp" />

            <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* TOP ACTION BAR */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center">
                    <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
                        <div className="group relative w-full sm:w-64">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[var(--primary-color)]"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search WhatsApp..."
                                className="w-full rounded-xl border-none bg-gray-50 py-2 pl-10 pr-4 transition-all focus:ring-2 focus:ring-[var(--primary-color)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative w-full sm:w-48">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select
                                className="w-full appearance-none rounded-xl border-none bg-gray-50 py-2 pl-10 pr-4 focus:ring-2 focus:ring-[var(--primary-color)]"
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
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary-color)] px-6 py-3 font-bold italic tracking-tighter text-white shadow-lg shadow-red-900/20 transition-all hover:scale-105 md:w-auto"
                    >
                        <Plus size={20} strokeWidth={3} /> NEW WhatsApp NUMBER
                    </button>
                </div>

                {/* TABLE CONTAINER */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <th className="px-8 py-5">ID</th>
                                    <th className="px-8 py-5">Phone</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredWhatsApp.map((whatsApp) => (
                                    <tr key={whatsApp.id} className="group transition-all hover:bg-gray-50/80">
                                        <td className="px-8 py-5 text-sm font-bold text-gray-400">#{whatsApp.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="h-10 w-10 rounded-xl border-4 border-white shadow-inner"
                                                    
                                                />
                                                <div>
                                                    <div className="text-lg font-black italic tracking-tighter text-gray-900">{whatsApp.phone}</div>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                                                    whatsApp.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                                }`}
                                            >
                                                {whatsApp.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('whatsApp.show', whatsApp.id)}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => openEditModal(whatsApp)}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-500"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => confirm('Delete this brand?') && destroy(route('whatsApp.destroy', whatsApp.id))}
                                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-8 py-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Showing {filteredWhatsApp.length} WhatsApps</span>
                        <div className="flex gap-2">
                            {whatsApp.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-xl px-4 py-2 text-xs font-black transition-all ${
                                        link.active
                                            ? 'bg-[var(--primary-color)] text-white shadow-md'
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
                                    {editingWhatsApp ? 'Update WhatsApp' : 'New WhatsApp'}
                                </h2>
                                <button onClick={() => setModalOpen(false)} className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 p-8">
                                <div>
                                    <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full rounded-2xl border-none bg-gray-50 px-5 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-[var(--primary-color)]"
                                        placeholder="Enter phone number..."
                                    />
                                    {errors.phone && <p className="ml-1 mt-2 text-[10px] font-bold uppercase text-red-500">{errors.phone}</p>}
                                </div>

                                
                                    
                                    <div>
                                        <label className="mb-2 ml-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Status
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
                                        {editingWhatsApp ? 'SAVE CHANGES' : 'CREATE WhatsApp'}
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