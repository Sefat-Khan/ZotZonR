import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Hero() {
  const {trendings} = usePage().props;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === trendings.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [trendings]);

  return (
      <div className="container relative mx-auto flex items-center justify-center overflow-hidden bg-[#f5f7fa] p-4 md:h-[31rem]">
          {/* Slider Wrapper */}
          <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${trendings.length * 100}%`,
              }}
          >
              {trendings.map((slide) => (
                  <div
                      key={slide.id}
                      className="flex h-full w-full shrink-0 flex-col-reverse items-center justify-center px-4 md:flex-row md:justify-around md:px-12"
                  >
                      {/* Text Content */}
                      <div className="flex flex-col gap-4 text-center md:max-w-lg md:gap-6 md:text-left">
                          <h2 className="text-3xl font-bold text-[#262626] md:text-5xl">{slide.name}</h2>
                          <p className="text-gray-500 md:text-lg">
                              Up to <span className="text-2xl font-bold text-[#262626] md:text-4xl">{slide.discount}</span> {slide.description}
                          </p>
                          <Link
                              href={route('shop.index')}
                              className="w-fit cursor-pointer self-center bg-[#262626] px-10 py-3 text-sm text-white transition-all duration-300 ease-in hover:bg-[#262626]/70 hover:text-black md:self-start md:px-12 md:text-base"
                          >
                              Shop Now
                          </Link>
                      </div>

                      {/* Image */}
                      <div className="flex h-[12rem] w-full justify-center md:h-[22rem] md:w-auto">
                          <img src={slide.image_url} alt={slide.name} className="h-full object-contain" />
                      </div>
                  </div>
              ))}
          </div>

          {/* Slider Indicators */}
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 transform flex-col gap-2 md:left-8">
              {trendings.map((_, idx) => (
                  <div
                      key={idx}
                      className={`flex h-8 w-12 cursor-pointer items-center justify-center border-l-4 border-solid transition-all duration-300 md:h-10 md:w-16 ${
                          idx === currentIndex ? 'border-[var(--primary-color)] font-bold text-[var(--primary-color)]' : 'border-white text-gray-300'
                      }`}
                      onClick={() => setCurrentIndex(idx)}
                  >
                      0{idx + 1}
                  </div>
              ))}
          </div>
      </div>
  );
}
