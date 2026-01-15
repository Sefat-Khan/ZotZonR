import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    product: {
        id: number;
        name: string;
        slug: string;
        phone: string;
        description: string;
        price: number;
        discount_price: number;
        status: string;
        image_url: string;
        brand: { id: number; name: string };
        category: { id: number; name: string };
        created_at: string;
    };
    // Add these if you want to pass prev/next IDs from your Controller
    prev_id?: number;
    next_id?: number;
}

export default function Preview({ product, prev_id, next_id }: Props) {
    const finalPrice = product.discount_price > 0 ? product.price - (product.price * product.discount_price) / 100 : product.price;

    return (
        <AuthenticatedLayout header="Product Preview">
            <Head title={product.name} />

            <div className="mx-auto max-w-7xl px-4 py-6">
                {/* Top Bar */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <p className="text-sm text-gray-500">
                            Product ID #{product.id} · Created {product.created_at}
                        </p>
                    </div>

                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-300"
                    >
                        ← Back to Products
                    </Link>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="grid grid-cols-1 gap-10 p-6 lg:grid-cols-2 lg:p-10">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="absolute left-4 top-4 z-10">
                                <span
                                    className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ${
                                        product.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                >
                                    {product.status}
                                </span>
                            </div>

                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-[320px] w-full rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02] sm:h-[420px]"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="space-y-6">
                            <div>
                                {product.discount_price > 0 ? (
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
                                        <span className="text-lg text-gray-400 line-through">${product.price}</span>
                                        <span className="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                                            -{product.discount_price}% OFF
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <InfoItem label="Brand" value={product.brand.name} />
                                <InfoItem label="Category" value={product.category.name} />
                                <InfoItem label="Slug" value={product.slug} />
                                <InfoItem label="Phone" value={product.phone} />
                            </div>

                            <div>
                                <h3 className="mb-2 text-xs font-black uppercase tracking-widest text-gray-400">Description</h3>
                                <p className="text-sm leading-relaxed text-gray-600">{product.description || 'No description provided.'}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 border-t border-gray-50 pt-6">
                                <Link
                                    href={route('products.index')}
                                    className="rounded-xl bg-gray-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-gray-200 transition-all hover:bg-black"
                                >
                                    Edit Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
            <p className="break-words text-sm font-bold text-gray-800">{value}</p>
        </div>
    );
}