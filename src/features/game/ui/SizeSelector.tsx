import React from "react";

export function SizeSelector({
  sizes,
  size,
  onChange,
}: {
  sizes: number[];
  size: number;
  onChange: (s: number) => void;
}) {
  return (
    <div
      className="flex items-center justify-between font-bold appearing"
      style={{ height: 80 }}
    >
      <div>Kutu Sayısı:</div>
      <div className="flex gap-3">
        {sizes.map((s) => (
          <label
            key={s}
            className={`inline-flex items-center justify-center rounded-full border-4 w-8 h-8 ${size === s ? "bg-[#35495e] text-white border-gray-800" : "border-gray-800"}`}
          >
            <input
              type="radio"
              className="sr-only"
              checked={size === s}
              onChange={() => onChange(s)}
            />
            {s}
          </label>
        ))}
      </div>
    </div>
  );
}
