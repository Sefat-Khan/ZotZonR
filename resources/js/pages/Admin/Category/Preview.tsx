import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Edit3, Calendar, Fingerprint, Activity, Layers } from 'lucide-react';

interface Props {
    category: {
        id: number;
        name: string;
        color: string;
        status: 'Active' | 'Inactive';
        created_at: string;
        updated_at: string;
    };
}

export default function Preview({ category }: Props) {
    return (
        <AuthenticatedLayout header="Category Details">
            <Head title={`Category • ${category.name}`} />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Navigation Header */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href={route('categories.index')}
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-[var(--primary-color)]"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Categories
                    </Link>

                    <div className="flex gap-3">
                        <Link
                            href={route('categories.index', category.id)}
                            className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 font-black italic tracking-tighter text-white shadow-lg transition-all hover:bg-[var(--primary-color)]"
                        >
                            <Edit3 size={16} /> EDIT CATEGORY
                        </Link>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">
                    {/* Visual Accent Strip */}
                    <div className="h-4 w-full" style={{ backgroundColor: category.color }} />

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                            {/* Left Column: Identity */}
                            <div className="flex flex-col items-center space-y-6 border-b border-gray-100 pb-12 text-center lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
                                <div className="relative">
                                    <div
                                        className="flex h-32 w-32 items-center justify-center rounded-[2.5rem] border-8 border-white shadow-2xl ring-1 ring-gray-100 transition-transform hover:scale-105"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        <Layers size={40} className="text-white/30" />
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-gray-900">
                                        {category.name}
                                    </h1>
                                    <p className="mt-3 font-mono text-sm font-bold uppercase tracking-tighter text-gray-400">
                                        Color HEX: {category.color}
                                    </p>
                                </div>

                                <div
                                    className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                        category.status === 'Active'
                                            ? 'border border-emerald-100 bg-emerald-50 text-emerald-600'
                                            : 'border border-red-100 bg-red-50 text-red-600'
                                    }`}
                                >
                                    {category.status} Mode
                                </div>
                            </div>

                            {/* Right Column: Metadata */}
                            <div className="space-y-8 lg:col-span-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <Info label="Category ID" value={`#${category.id}`} icon={<Fingerprint size={16} />} />
                                    <Info label="Current Visibility" value={category.status} icon={<Activity size={16} />} />
                                    <Info
                                        label="Date Created"
                                        value={new Date(category.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                        icon={<Calendar size={16} />}
                                    />
                                    <Info
                                        label="Last Modified"
                                        value={new Date(category.updated_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                        icon={<Calendar size={16} />}
                                    />
                                </div>

                                {/* Information Box */}
                                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-8">
                                    <div className="relative z-10">
                                        <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[var(--primary-color)]" />
                                            System Insights
                                        </h3>
                                        <p className="max-w-prose text-sm font-medium leading-relaxed text-gray-500">
                                            This category serves as a primary filter for your product catalog. Items assigned to{' '}
                                            <span className="font-bold text-gray-900">"{category.name}"</span> will inherit this color coding in the
                                            public storefront and inventory reports.
                                        </p>
                                    </div>
                                    <Layers className="absolute -bottom-6 -right-6 h-32 w-32 text-gray-200/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* Reusable Metadata Card */
function Info({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-900">
            <div className="mb-2 flex items-center gap-3 text-gray-400 transition-colors group-hover:text-gray-900">
                {icon}
                <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
            </div>
            <p className="truncate text-lg font-black italic tracking-tighter text-gray-800">{value}</p>
        </div>
    );
}