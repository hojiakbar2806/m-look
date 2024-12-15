import { Check } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function ColorCard({ colors }: { colors: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="rounded-lg flex gap-3 flex-col p-4 bg-gray-100">
      <h2 className="text-xl font-medium">Color</h2>
      <div className="flex gap-4 flex-wrap">
        {colors.map((color, index) => (
          <label
            htmlFor={`color-${index}`}
            key={index}
            className="flex items-center relative"
          >
            <input
              type="checkbox"
              className="peer hidden"
              name="color"
              checked={searchParams.get("color") === color}
              id={`color-${index}`}
              value={color}
              onChange={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("color", color);
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
            <span
              className="cursor-pointer w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center relative"
              style={{ backgroundColor: color }}
            >
              <Check
                color="#fff"
                className="absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ColorCard;
