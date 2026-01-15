import React from 'react';
import { Truck, ShieldCheck, Headphones, Leaf, ArrowRight, Check, ShoppingBasket } from 'lucide-react';

export default function AboutContent() {
    return (
        <div className="bg-white">
            {/* HERO SECTION - Deep Maroon Aesthetic */}
            <section className="relative overflow-hidden bg-[var(--primary-color)] py-24 text-white">
                <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--secondary-color)] opacity-20 blur-3xl"></div>
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter md:text-7xl">
                        Freshness <span className="text-[var(--secondary-color)]">Redefined</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/80">
                        From the finest local farms to your kitchen table. We are dedicated to providing premium organic produce and daily essentials
                        with uncompromising quality.
                    </p>
                </div>
            </section>

            {/* STORY SECTION - Grocery Focused */}
            <section className="container mx-auto px-4 py-24">
                <div className="grid items-center gap-16 md:grid-cols-2">
                    <div className="relative">
                        <div className="border-[var(--secondary-color)]/20 absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2"></div>
                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                            alt="Fresh Organic Vegetables"
                            className="relative z-10 rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--secondary-color)]">Our Roots</h2>
                            <h3 className="mt-2 text-4xl font-black italic text-[var(--primary-color)]">Purity in Every Grain & Leaf.</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Founded with a passion for healthy living, our grocery store brings together hand-picked organic vegetables, premium
                            pantry staples, and fresh dairy. We believe that everyone deserves access to clean, nutritious food.
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {['Farm-Fresh Produce', 'Chemical Free', 'Fast Home Delivery', 'Ethically Sourced'].map((item) => (
                                <div key={item} className="flex items-center gap-2 font-bold text-[var(--text-black)]">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--secondary-color)] text-white">
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES - Minimal Icons */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-16 text-xs font-black uppercase tracking-[0.5em] text-gray-400">Why Shop With Us</h2>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                        <Feature icon={<Truck size={32} />} title="Express Delivery" text="Same-day delivery to keep your groceries fresh." />
                        <Feature icon={<Leaf size={32} />} title="100% Organic" text="No pesticides, just pure nature on your plate." />
                        <Feature icon={<ShoppingBasket size={32} />} title="Bulk Savings" text="Get the best prices on monthly pantry refills." />
                        <Feature
                            icon={<ShieldCheck size={32} />}
                            title="Quality Check"
                            text="Rigorous sorting to ensure only the best reaches you."
                        />
                    </div>
                </div>
            </section>

            {/* CTA SECTION - Premium Grocery Card */}
            <section className="container mx-auto px-4 py-24">
                <div className="shadow-maroon-900/30 relative overflow-hidden rounded-[2.5rem] bg-[var(--primary-color)] p-12 text-center text-white shadow-2xl md:p-20">
                    <div className="from-[var(--secondary-color)]/30 absolute inset-0 bg-gradient-to-br to-transparent"></div>

                    <div className="relative z-10">
                        <h2 className="mb-6 text-4xl font-black uppercase italic tracking-tighter md:text-6xl">
                            Fill Your Basket <br /> With Goodness
                        </h2>
                        <p className="mb-10 text-white/70">Order today and get free delivery on your first grocery haul.</p>
                        <a
                            href={route('shop.index')}
                            className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-[var(--primary-color)] shadow-2xl transition-all hover:scale-105 hover:bg-[var(--secondary-color)] hover:text-white active:scale-95"
                        >
                            Start Shopping <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="group space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[var(--primary-color)] shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-[var(--secondary-color)] group-hover:text-white">
                {icon}
            </div>
            <h4 className="text-lg font-black uppercase tracking-tighter text-[var(--primary-color)]">{title}</h4>
            <p className="mx-auto max-w-[200px] text-sm font-medium text-gray-500">{text}</p>
        </div>
    );
}