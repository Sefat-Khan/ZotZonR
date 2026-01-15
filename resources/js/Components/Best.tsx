import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function Best() {
    const { trendings } = usePage().props;

    // Sorting to find the highest discount item
    const topTrendings = [...trendings].sort((a, b) => b.discount - a.discount).slice(0, 1);

    return (
        <div className="bg-[var(--primary-color)] px-4 py-16">
            <div className="container mx-auto">
                {topTrendings.map((trend) => (
                    <div
                        key={trend.id}
                        className="group relative flex flex-col items-stretch overflow-hidden rounded-[2.5rem] bg-white shadow-2xl md:flex-row"
                    >
                        {/* LEFT: Product Image Section */}
                        <div className="relative flex items-center justify-center overflow-hidden bg-gray-50 p-8 md:w-5/12">
                            {/* Animated Discount Badge */}
                            <div className="absolute left-8 top-8 z-10 animate-bounce">
                                <div className="-rotate-12 transform rounded-full bg-[var(--secondary-color)] px-6 py-3 text-xl font-black italic text-white shadow-lg">
                                    SAVE {trend.discount}%
                                </div>
                            </div>

                            <img
                                src={trend.image_url}
                                alt={trend.name}
                                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* RIGHT: Content Section */}
                        <div className="flex flex-col justify-center space-y-6 p-8 md:w-7/12 md:p-16">
                            <div className="space-y-2">
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--secondary-color)]">Limited Time Offer</p>
                                <h3 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-[var(--primary-color)] md:text-6xl">
                                    {trend.name}
                                </h3>
                            </div>

                            <p className="max-w-xl text-lg font-medium leading-relaxed text-gray-500">{trend.description}</p>

                            <div className="flex items-end gap-4 pb-4">
                                <span className="text-4xl font-black italic text-[var(--primary-color)]">{trend.discount}% OFF</span>
                                <span className="mb-1 text-xl font-bold text-gray-300 line-through">৳{trend.price}</span>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('shop.index')}
                                    className="shadow-maroon-900/20 flex items-center justify-center gap-3 rounded-2xl bg-[var(--primary-color)] px-10 py-5 font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-[var(--secondary-color)] active:scale-95"
                                >
                                    Shop Now <ShoppingCart size={20} />
                                </Link>

                                <Link
                                    href={route('about')}
                                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-100 px-10 py-5 font-black uppercase tracking-widest text-[var(--primary-color)] transition-all hover:border-[var(--primary-color)]"
                                >
                                    Learn More <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                        {/* Design Element: Large faded text in background */}
                        <span className="absolute -bottom-10 -right-10 -z-0 hidden select-none text-[10rem] font-black italic text-gray-50 lg:block">
                            BEST
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
