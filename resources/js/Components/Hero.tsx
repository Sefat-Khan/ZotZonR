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
    <div className="bg-[#f5f7fa] md:h-[31rem] relative overflow-hidden flex items-center justify-center p-4 container mx-auto">
      {/* Slider Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${trendings.length * 100}%`,
        }}
      >
        {trendings.map((slide) => (
          <div
            key={slide.id}
            className="shrink-0 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-around px-4 md:px-12"
          >
            {/* Text Content */}
            <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left md:max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold text-[#262626]">
                {slide.name}
              </h2>
              <p className="text-gray-500 md:text-lg">
                Up to{" "}
                <span className="text-2xl md:text-4xl font-bold text-[#262626]">
                  {slide.discount}
                </span>{" "}
                {slide.description}
              </p>
              <Link href={route('shop.index')} className="py-3 px-10 md:px-12 self-center md:self-start w-fit text-sm md:text-base text-white bg-[#262626] hover:bg-[#262626]/70 cursor-pointer hover:text-black transition-all duration-300 ease-in">
               Shop Now
              </Link>
              
            </div>

            {/* Image */}
            <div className="h-[12rem] md:h-[22rem] w-full md:w-auto flex justify-center">
              <img
                src={slide.image_url}
                alt={slide.name}
                className="object-contain h-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 flex flex-col gap-2">
        {trendings.map((_, idx) => (
          <div
            key={idx}
            className={`w-12 md:w-16 h-8 md:h-10 flex items-center justify-center border-l-4 border-solid cursor-pointer transition-all duration-300 ${
              idx === currentIndex
                ? "border-[var(--primary-color)] text-[var(--primary-color)] font-bold"
                : "border-white text-gray-300"
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
