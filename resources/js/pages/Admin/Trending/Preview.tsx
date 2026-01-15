import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Edit3, Calendar, Fingerprint, Tag, Activity } from 'lucide-react';

interface Props {
    trending: {
        id: number;
        name: string;
        slug: string;
        description: string;
        discount: number;
        status: 'Active' | 'Inactive';
        image_url: string;
        created_at: string;
    };
}

export default function Preview({ trending }: Props) {
    return (
        <AuthenticatedLayout header="Trending Preview">
            <Head title={`Preview: ${trending.name}`} />

            <div className="mx-auto max-w-6xl px-4 py-8 antialiased sm:px-6">
                {/* --- NAVIGATION BAR --- */}
                <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="rounded-lg bg-[#2e0000] p-2 shadow-lg shadow-red-900/20">
                                <Activity className="text-white" size={18} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#7a0222]">Campaign Insights</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-[#2e0000]">{trending.name}</h1>
                        <p className="mt-1 flex items-center gap-2 text-sm font-bold text-gray-400">
                            <Fingerprint size={14} strokeWidth={3} />
                            SYS-ID: {trending.id.toString().padStart(4, '0')}
                        </p>
                    </div>

                    <Link
                        href={route('trendings.index')}
                        className="group flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-500 transition-all hover:border-[#2e0000] hover:text-[#2e0000]"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Return to Room
                    </Link>
                </div>

                {/* --- MAIN DISPLAY --- */}
                <div className="overflow-hidden rounded-[3rem] border border-red-50 bg-white shadow-2xl shadow-red-900/5">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* LEFT: VISUAL ASSET */}
                        <div className="relative p-4 lg:col-span-5">
                            <div className="relative h-full min-h-[400px] overflow-hidden rounded-[2.5rem] shadow-inner">
                                <img
                                    src={trending.image_url}
                                    alt={trending.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                <div className="absolute bottom-6 left-6">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ${
                                            trending.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`h-2 w-2 rounded-full ${trending.status === 'Active' ? 'animate-pulse bg-white' : 'bg-gray-500'}`}
                                        />
                                        {trending.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: DATA & INTEL */}
                        <div className="flex flex-col p-8 lg:col-span-7 lg:p-12">
                            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Incentive</span>
                                    <div className="mt-1 flex items-baseline gap-1">
                                        <span className="text-6xl font-black tracking-tighter text-[#7a0222]">{trending.discount || 0}</span>
                                        <span className="text-2xl font-black text-[#2e0000]">%</span>
                                        <Tag className="ml-2 text-red-200" size={24} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">
                                        <Calendar className="text-gray-400" size={16} />
                                        <div className="text-right">
                                            <p className="text-[9px] font-black uppercase leading-none text-gray-400">Registered On</p>
                                            <p className="text-xs font-bold text-gray-700">{trending.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <InfoCard label="URL Slug" value={trending.slug} />
                                    <InfoCard label="Visibility" value={trending.status === 'Active' ? 'Public' : 'Hidden'} />
                                </div>

                                <div>
                                    <h3 className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#7a0222]">Strategic Description</h3>
                                    <p className="text-lg font-medium leading-relaxed text-gray-600">
                                        {trending.description || 'No campaign description provided for this entry.'}
                                    </p>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex flex-wrap gap-4 border-t border-red-50 pt-10">
                                    <Link
                                        href={route('trendings.edit', trending.id)}
                                        className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#2e0000] px-8 py-5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-red-900/20 transition-all hover:bg-[#7a0222] active:scale-95"
                                    >
                                        <Edit3 size={18} />
                                        Modify Campaign
                                    </Link>

                                    <Link
                                        href={route('trendings.index')}
                                        className="flex items-center justify-center rounded-2xl bg-gray-100 px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500 transition-all hover:bg-gray-200"
                                    >
                                        Close
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* Reusable Info Card Match */
function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="group rounded-[1.5rem] border border-red-50/50 bg-red-50/30 p-5 transition-colors hover:border-red-100">
            <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#7a0222]">{label}</p>
            <p className="truncate font-black text-[#2e0000]">{value}</p>
        </div>
    );
}