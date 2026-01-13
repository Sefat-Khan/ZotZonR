import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function FilterSection({
  title,
  items = [],
  selected,
  setSelected,
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, 4);

  return (
    <div className="border-b pb-4">
      {/* Title + Clear */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>

        {selected && (
          <button
            onClick={() => setSelected("")}
            className="flex items-center gap-1 text-xs text-[var(--primary-color)] hover:underline"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Filter Items */}
      <div className="flex flex-col gap-2">
        {visibleItems.map((item) => (
          <button
            key={item}
            onClick={() =>
              setSelected(selected === item ? "" : item)
            }
            className={`text-left px-2 py-1 rounded transition ${
              selected === item
                ? "bg-[var(--primary-color)] text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* See More / Less */}
      {items.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm text-[var(--primary-color)] mt-3 hover:underline"
        >
          {showAll ? (
            <>
              See less <ChevronUp size={14} />
            </>
          ) : (
            <>
              See more <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
