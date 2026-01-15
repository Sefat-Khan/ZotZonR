import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Offer() {
    const { trendings } = usePage().props;

    // Safeguard and sort
    const sorted = [...(trendings || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const topTrendings = sorted.slice(0, 1);
    const top2Trendings = sorted.slice(1, 3);

    if (sorted.length === 0) return null;

    return (
        <section className="bg-[var(--primary-color)] px-6 py-16 md:px-20">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                    {/* Main Large Offer (Left Column) */}
                    {topTrendings.map((trend) => (
                        <div
                            key={trend.id}
                            className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] p-8 md:p-12 lg:row-span-2"
                        >
                            <div className="relative z-10 max-w-md">
                                <span className="mb-4 inline-block rounded-full bg-[var(--primary-color)] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                    Limited Offer
                                </span>
                                <h2 className="mb-6 text-4xl font-black uppercase italic leading-[1.1] tracking-tighter text-[#1a1a1a] md:text-5xl">
                                    {trend.name}
                                </h2>
                                <p className="mb-8 font-medium leading-relaxed text-gray-500">
                                    Enjoy up to <span className="mx-1 text-2xl font-black text-[var(--primary-color)]">{trend.discount}% OFF</span>
                                    <br /> {trend.description}
                                </p>
                                <Link
                                    href={route('shop.index')}
                                    className="inline-flex items-center gap-3 rounded-full bg-[#1a1a1a] px-10 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-[var(--primary-color)] group-hover:shadow-xl"
                                >
                                    Shop the collection <ArrowRight size={14} />
                                </Link>
                            </div>

                            {/* Background Image with Floating Effect */}
                            <div className="pointer-events-none absolute bottom-0 right-0 h-3/4 w-3/4 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-110">
                                <img src={trend.image_url} alt={trend.name} className="h-full w-full object-contain object-right-bottom p-4" />
                            </div>
                        </div>
                    ))}

                    {/* Secondary Smaller Offers (Right Column) */}
                    <div className="flex flex-col gap-6 md:gap-8">
                        {top2Trendings.map((trend) => (
                            <div
                                key={trend.id}
                                className="group relative flex min-h-[240px] flex-col items-center justify-between overflow-hidden rounded-[2.5rem] bg-[#f8f9fa] p-8 md:flex-row"
                            >
                                <div className="relative z-10 text-center md:text-left">
                                    <h2 className="mb-3 text-2xl font-black uppercase italic tracking-tighter text-[#1a1a1a] md:text-3xl">
                                        {trend.name}
                                    </h2>
                                    <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Discount <span className="ml-1 text-[var(--primary-color)]">{trend.discount}%</span>
                                    </p>
                                    <Link
                                        href={route('shop.index')}
                                        className="inline-flex items-center gap-2 border-b-2 border-[#1a1a1a] pb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1a1a] transition-all hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                                    >
                                        Discover <ArrowRight size={12} />
                                    </Link>
                                </div>

                                <div className="mt-6 h-48 w-48 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 md:mt-0">
                                    <img src={trend.image_url} alt={trend.name} className="h-full w-full object-contain" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}