import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ActivityIcon, ArrowLeft, Calendar, Edit3, Fingerprint, FingerprintIcon } from "lucide-react";


interface Props {
    whatsApp: {
        id: number;
        phone: string;
        status: 'Active' | 'Inactive';
        created_at: string;
        updated_at: string;
    };
}

export default function Preview({ whatsApp }: Props) {
    return (
        <AuthenticatedLayout header="WhatsApp Details">
            <Head title={`WhatsApp • ${whatsApp.phone}`} />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Navigation Header */}
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        href={route('whatsApp.index')}
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-[var(--primary-color)]"
                    >
                        <ArrowLeft size={16} />
                        Back to Inventory
                    </Link>

                    <Link
                        href={route('whatsApp.edit', whatsApp.id)}
                        className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 font-black italic tracking-tighter text-white shadow-lg transition-all hover:bg-[var(--primary-color)]"
                    >
                        <Edit3 size={16} /> EDIT WHATSAPP
                    </Link>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm">

                    {/* Static WhatsApp Color Strip */}
                    <div className="h-4 w-full bg-green-500" />

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                            {/* Left Section */}
                            <div className="flex flex-col items-center space-y-6 border-b border-gray-100 pb-12 text-center lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">

                                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900">
                                    {whatsApp.phone}
                                </h1>

                                <div
                                    className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                                        whatsApp.status === 'Active'
                                            ? 'border border-emerald-100 bg-emerald-50 text-emerald-600'
                                            : 'border border-red-100 bg-red-50 text-red-600'
                                    }`}
                                >
                                    {whatsApp.status} Status
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="space-y-8 lg:col-span-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <Info label="System Identifier" value={whatsApp.id.toString()} icon={<FingerprintIcon size={16} />} />
                                    <Info label="Current Status" value={whatsApp.status} icon={<ActivityIcon size={16} />} />
                                    <Info label="Entry Created" value={whatsApp.created_at} icon={<Calendar size={16} />} />
                                    <Info label="Last Revision" value={whatsApp.updated_at} icon={<Calendar size={16} />} />
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
