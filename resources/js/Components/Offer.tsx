import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Offer() {
  const {trendings} = usePage().props;
  
      const topTrendings = [...trendings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 1);
      const top2Trendings = [...trendings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(1, 3);
  return (
    <div className="bg-[var(--primary-color)] p-8 md:p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {topTrendings.map(trend => (
          <div className="w-full bg-[#f5f7fa] p-3 row-span-2 shrink-0 flex flex-col-reverse gap-y-8 px-2">
          <div className="text-[#262626] p-6 flex flex-col gap-y-6">
            <h2 className="text-2xl md:text-4xl font-bold">{trend.name}</h2>
            <p className="text-sm text-gray-400">
              Up to{" "}
              <span className="text-xl md:text-3xl font-bold text-[#262626] mx-2">
                {trend.discount}
              </span>
              {trend.description}
            </p>
            <Link href={route('shop.index')} className="py-3 px-8 md:px-12 w-fit text-xs text-white bg-[#262626] hover:bg-[#262626]/70 cursor-pointer hover:text-black transition-all duration-300 ease-in">
               Shop Now
              </Link>
            
          </div>
          <div className="h-[300px] w-full self-center md:self-start">
            <img
              src={trend.image_url}
              alt={trend.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        ))}
        
        {top2Trendings.map(trend => (
          <div className="w-full h-full bg-[#f5f7fa] p-3 shrink-0 flex md:flex-row flex-col-reverse justify-around items-center px-2">
          <div className="text-[#262626] flex flex-col gap-y-6 p-6">
            <h2 className="text-2xl md:text-3xl font-bold">{trend.name}</h2>
            <p className="text-sm text-gray-400">
              Up to{" "}
              <span className="text-xl md:text-3xl font-bold text-[#262626] mx-2">
                {trend.discount}
              </span>
              {trend.description}
            </p>
            <Link href={route('shop.index')} className="py-3 px-8 md:px-12 w-fit text-xs text-white bg-[#262626] hover:bg-[#262626]/70 cursor-pointer hover:text-black transition-all duration-300 ease-in">
               Shop Now
              </Link>
           
          </div>
          <div className="h-full">
            <img src={trend.image_url} alt={trend.name} className="object-contain" />
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
}
