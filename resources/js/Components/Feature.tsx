import { RotateCcw, Truck, Timer } from "lucide-react";
import React from "react";

export default function Feature() {
  const features = [
    { icon: <Timer />, text: "Year Warranty" },
    { icon: <Truck />, text: "Free Shipping" },
    { icon: <RotateCcw />, text: "Return policy in 30 days" },
  ];

  return (
    <div className="bg-[var(--primary-color)] px-6 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center gap-6 md:gap-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-row md:flex-col items-center justify-center gap-3 text-white text-center md:text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="text-4xl md:text-5xl">
              {feature.icon}
            </div>
            <p className="text-sm md:text-base font-semibold">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
