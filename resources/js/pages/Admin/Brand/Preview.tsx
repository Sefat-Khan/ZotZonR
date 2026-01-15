import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Edit3, Calendar, Fingerprint, Activity, Hash } from 'lucide-react';

interface Props {
    brand: {
        id: number;
        name: string;
        color: string;
        status: 'Active' | 'Inactive';
        created_at: string;
        updated_at: string;
    };
}

export default function Preview({ brand }: Props) {
    return (
        <AuthenticatedLayout header="Brand Details">
            <Head title={`Brand • ${brand.name}`} />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Navigation Header */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href={route('brands.index')}
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-[var(--primary-color)]"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Inventory
                    </Link>

                    <div className="flex gap-3">
                        <Link
                            href={route('brands.edit', brand.id)}
                            className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 font-black italic tracking-tighter text-white shadow-lg transition-all hover:bg-[var(--primary-color)]"
                        >
                            <Edit3 size={16} /> EDIT BRAND
                        </Link>
                    </div>
                </div>

                {/* Main Identity Card */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                    {/* Top Branding Strip */}
                    <div className="h-4 w-full" style={{ backgroundColor: brand.color }} />

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                            {/* Visual Identity Section */}
                            <div className="flex flex-col items-center space-y-6 border-b border-gray-100 pb-12 text-center lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
                                <div className="relative">
                                    <div
                                        className="h-32 w-32 rounded-[2.5rem] border-8 border-white shadow-2xl ring-1 ring-gray-100"
                                        style={{ backgroundColor: brand.color }}
                                    />
                                    <div className="absolute -bottom-2 -right-2 rounded-lg border border-gray-50 bg-white p-2 shadow-md">
                                        <Hash size={20} className="text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-gray-900">{brand.name}</h1>
                                    <p className="mt-2 font-mono text-sm font-bold uppercase tracking-tighter text-gray-400">HEX: {brand.color}</p>
                                </div>

                                <div
                                    className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                        brand.status === 'Active'
                                            ? 'border border-emerald-100 bg-emerald-50 text-emerald-600'
                                            : 'border border-red-100 bg-red-50 text-red-600'
                                    }`}
                                >
                                    {brand.status} Status
                                </div>
                            </div>

                            {/* Data Specifications Section */}
                            <div className="space-y-8 lg:col-span-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <Info label="System Identifier" value={brand.id.toString()} icon={<Fingerprint size={16} />} />
                                    <Info label="Current Status" value={brand.status} icon={<Activity size={16} />} />
                                    <Info
                                        label="Entry Created"
                                        value={new Date(brand.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                        icon={<Calendar size={16} />}
                                    />
                                    <Info
                                        label="Last Revision"
                                        value={new Date(brand.updated_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                        icon={<Calendar size={16} />}
                                    />
                                </div>

                                {/* Placeholder for related products/statistics */}
                                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
                                    <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" /> Usage Summary
                                    </h3>
                                    <p className="text-sm font-medium leading-relaxed text-gray-500">
                                        This brand identity is currently being utilized across your inventory management system. Modifying the primary
                                        color or name will reflect across all associated products and analytics charts immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* Reusable Info Component */
function Info({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-[var(--primary-color)]">
            <div className="mb-2 flex items-center gap-3">
                <div className="text-gray-300 transition-colors group-hover:text-[var(--primary-color)]">{icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
            </div>
            <p className="truncate text-lg font-black italic tracking-tighter text-gray-800">{value}</p>
        </div>
    );
}