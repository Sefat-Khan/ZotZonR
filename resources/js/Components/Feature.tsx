import { Leaf, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

export default function Feature() {
    const features = [
        {
            icon: <Leaf className="text-[var(--secondary-color)]" />,
            title: '100% Organic',
            desc: 'Farm Fresh Quality',
        },
        {
            icon: <Zap className="text-[var(--secondary-color)]" />,
            title: '60 Min Delivery',
            desc: 'Inside Dhaka City',
        },
        {
            icon: <RotateCcw className="text-[var(--secondary-color)]" />,
            title: 'Easy Returns',
            desc: 'No Questions Asked',
        },
        {
            icon: <ShieldCheck className="text-[var(--secondary-color)]" />,
            title: 'Secure Payment',
            desc: '100% Safe Checkout',
        },
    ];

    return (
        <div className="relative overflow-hidden bg-[var(--primary-color)] px-4 py-12">
            {/* Decorative background element */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-5">
                <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full border-[40px] border-white"></div>
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group flex cursor-default items-center gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:bg-white/10 md:flex-col lg:flex-row"
                        >
                            {/* Icon Container */}
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl transition-transform duration-500 group-hover:rotate-12 md:h-16 md:w-16">
                                {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                            </div>

                            {/* Text Content */}
                            <div className="text-left md:text-center lg:text-left">
                                <h4 className="mb-1 text-xs font-black uppercase tracking-widest text-white">{feature.title}</h4>
                                <p className="text-xs font-medium italic text-white/60">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
