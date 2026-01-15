import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

// Import Swiper React components and styles
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Hero() {
    const { trendings } = usePage().props;

    if (!trendings || trendings.length === 0) return null;

    return (
        <section className="group relative w-full overflow-hidden bg-[#FCF9F6]">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    renderBullet: (index, className) => {
                        return `<span class="${className}">0${index + 1}</span>`;
                    },
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop={true}
                className="h-[45rem] md:h-[38rem]"
            >
                {trendings.map((slide) => (
                    <SwiperSlide key={slide.id} className="bg-[#FCF9F6]">
                        <div className="container mx-auto h-full px-6 md:px-20">
                            <div className="flex h-full w-full flex-col-reverse items-center justify-center gap-8 md:flex-row md:justify-between">
                                {/* Text Content */}
                                <div className="z-10 flex w-full max-w-2xl flex-col gap-4 text-center md:gap-6 md:text-left">
                                    <div className="inline-flex items-center justify-center gap-2 md:justify-start">
                                        <span className="h-[2px] w-8 bg-[var(--secondary-color)]"></span>
                                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[var(--secondary-color)]">
                                            Trending This Week
                                        </span>
                                    </div>

                                    <h1 className="text-4xl font-black uppercase italic leading-[1] tracking-tighter text-[var(--primary-color)] sm:text-5xl md:text-7xl">
                                        {slide.name}
                                    </h1>

                                    <p className="mx-auto max-w-md text-lg font-medium text-gray-500 md:mx-0 md:text-2xl">
                                        Get up to <span className="font-black text-[var(--primary-color)]">৳{slide.discount} OFF</span>{' '}
                                        {slide.description}
                                    </p>

                                    <div className="mt-4 flex justify-center md:justify-start">
                                        <Link
                                            href={route('shop.index')}
                                            className="flex items-center gap-3 rounded-full bg-[var(--primary-color)] px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black hover:shadow-2xl active:scale-95"
                                        >
                                            <ShoppingBag size={20} />
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className="relative flex h-[18rem] w-full items-center justify-center sm:h-[22rem] md:h-full md:w-1/2">
                                    <div className="bg-[var(--secondary-color)]/10 absolute h-[250px] w-[250px] rounded-full blur-[100px] md:h-[450px] md:w-[450px]"></div>
                                    <img
                                        src={slide.image_url}
                                        alt={slide.name}
                                        className="animate-float relative max-h-full w-auto object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Navigation Controls (Hidden on mobile for cleaner UI) */}
                <div className="pointer-events-none absolute inset-0 z-40 hidden md:block">
                    <div className="container relative mx-auto h-full">
                        <button className="swiper-button-prev-custom pointer-events-auto absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white/90 text-[var(--primary-color)] opacity-0 shadow-xl transition-all hover:bg-[var(--primary-color)] hover:text-white group-hover:opacity-100">
                            <ChevronLeft size={28} />
                        </button>
                        <button className="swiper-button-next-custom pointer-events-auto absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white/90 text-[var(--primary-color)] opacity-0 shadow-xl transition-all hover:bg-[var(--primary-color)] hover:text-white group-hover:opacity-100">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>

                {/* Centered on mobile (left-1/2 -translate-x-1/2), Reset on desktop (md:left-20 md:translate-x-0) */}
                <div className="custom-pagination absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 items-end gap-6 md:left-20 md:translate-x-0"></div>
            </Swiper>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .swiper-slide {
                    opacity: 0 !important;
                    transition: opacity 800ms ease-in-out;
                }
                .swiper-slide-active {
                    opacity: 1 !important;
                }

                .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
                    bottom: 5% !important;
                    left: 70% !important;
                    }
                .custom-pagination .swiper-pagination-bullet {
                    background: transparent !important;
                    opacity: 1 !important;
                    width: auto !important;
                    height: auto !important;
                    margin: 0 !important;
                    font-weight: 900;
                    font-style: italic;
                    font-size: 12px;
                    color: #d1d5db;
                    display: flex;
                    flex-direction: column;
                    align-items: center; /* Center text on mobile */
                    gap: 8px;
                    cursor: pointer;
                }
                @media (min-width: 768px) {
                    .custom-pagination .swiper-pagination-bullet {
                        align-items: flex-start; /* Align text left on desktop */
                    }
                    
                    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
                    bottom: 10% !important;
                    left: 40% !important;
                    }
                }
                .custom-pagination .swiper-pagination-bullet::after {
                    content: '';
                    display: block;
                    width: 30px;
                    height: 3px;
                    background: #e5e7eb;
                    border-radius: 99px;
                    transition: all 0.5s ease;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    color: var(--primary-color) !important;
                }
                .custom-pagination .swiper-pagination-bullet-active::after {
                    width: 60px;
                    background: var(--primary-color) !important;
                }
            `,
                }}
            />
        </section>
    );
}
