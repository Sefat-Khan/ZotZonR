import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

export default function FilterSection({ title, items = [], selected, setSelected }) {
    const [showAll, setShowAll] = useState(false);

    // Only show the first 5 items unless "Show All" is toggled
    const visibleItems = showAll ? items : items.slice(0, 5);

    return (
        <div className="mb-6 rounded-[2rem] border border-gray-100 bg-white p-6 transition-all hover:shadow-md">
            {/* Header: Title + Clear Button */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary-color)] shadow-[0_0_8px_var(--secondary-color)]"></div>
                    <h3 className="text-[11px] font-black uppercase leading-none tracking-[0.2em] text-[var(--primary-color)]">{title}</h3>
                </div>

                {selected && (
                    <button
                        onClick={() => setSelected('')}
                        className="group flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-500 hover:text-white"
                    >
                        <X size={10} className="stroke-[4px]" />
                        Clear
                    </button>
                )}
            </div>

            {/* Filter Buttons Grid */}
            <div className="flex flex-col gap-2">
                {visibleItems.map((item) => {
                    const isActive = selected === item;
                    return (
                        <button
                            key={item}
                            onClick={() => setSelected(isActive ? '' : item)}
                            className={`group relative flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                                isActive
                                    ? 'shadow-maroon-900/20 translate-x-1 border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-lg'
                                    : 'border-transparent bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-white hover:text-[var(--primary-color)]'
                            }`}
                        >
                            <span className={`font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item}</span>

                            {/* Status Indicator */}
                            <div
                                className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                                    isActive
                                        ? 'scale-100 bg-[var(--secondary-color)] shadow-[0_0_10px_#fff]'
                                        : 'scale-0 bg-gray-300 group-hover:scale-100'
                                }`}
                            ></div>
                        </button>
                    );
                })}
            </div>

            {/* Expand/Collapse Toggle */}
            {items.length > 5 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 transition-all hover:border-[var(--secondary-color)] hover:text-[var(--secondary-color)]"
                >
                    {showAll ? (
                        <>
                            Show Less <ChevronUp size={12} className="stroke-[3px] transition-transform group-hover:-translate-y-0.5" />
                        </>
                    ) : (
                        <>
                            Show More ({items.length - 5}+){' '}
                            <ChevronDown size={12} className="stroke-[3px] transition-transform group-hover:translate-y-0.5" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
