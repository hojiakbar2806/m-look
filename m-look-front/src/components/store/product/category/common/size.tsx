import { Check } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function SizeCard({ sizes }: { sizes: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="rounded-lg flex gap-4 flex-col p-4 bg-gray-100">
      <h2 className="text-xl font-medium">Size</h2>
      <div className="flex gap-4 flex-wrap">
        {sizes.map((size, index) => (
          <label
            htmlFor={`size-${index}`}
            key={index}
            className="flex items-center relative"
          >
            <input
              type="checkbox"
              className="peer hidden"
              name="size"
              checked={searchParams.get("size") === size}
              id={`color-${index}`}
              value={size}
              onChange={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("size", size);
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
            <span className="cursor-pointer rounded p-2 flex-1 border border-gray-300 flex items-center justify-center relative">
              <Check
                color="#fff"
                className="absolute opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              />
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SizeCard;
