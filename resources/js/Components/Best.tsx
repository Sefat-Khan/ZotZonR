import { usePage } from "@inertiajs/react";
import React from "react";

export default function Best() {
  const {trendings} = usePage().props;

  const topTrendings = [...trendings].sort((a, b) => b.discount - a.discount).slice(0, 1);
  return (
    <div className="bg-[var(--primary-color)] p-8 md:p-16">
      {topTrendings.map(trend => (
        <div className="flex md:flex-row flex-col gap-y-2 gap-x-16 bg-white text-black items-center">
        <div className="md:w-1/3">
          <img src={trend.image_url} alt={trend.name} />
        </div>
        <div className="flex flex-col gap-y-8 px-8 py-4 md:px-21">
          <h3 className="text-2xl md:text-3xl font-bold text-[#262626]">
            {trend.name}
          </h3>
          <p className="text-sm text-gray-500">
           {trend.description}
          </p>
          <button className="px-8 py-2 w-fit bg-[#4d4343] text-white self-center md:self-start">
            Shop Now
          </button>
        </div>
      </div>
      ))}
      
    </div>
  );
}
