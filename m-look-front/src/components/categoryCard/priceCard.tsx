import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useDebounce from "src/lib/useDebounce";

interface PriceCardProps {
  min: number;
  max: number;
  width: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ min, max, width }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const rangeRef = useRef<HTMLDivElement | null>(null);

  const debouncedMin = useDebounce(String(minVal), 400);
  const debouncedMax = useDebounce(String(maxVal), 400);

  const updateParams = useCallback(() => {
    params.set("min_price", String(debouncedMin));
    params.set("max_price", String(debouncedMax));
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedMin, debouncedMax]);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  useEffect(() => {
    updateParams();
  }, [debouncedMin, debouncedMax, updateParams]);

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-6 p-4 pb-8 bg-gray-100 rounded">
      <div className="w-full px-4 flex items-center justify-between gap-x-5">
        <p className="text-lg border-dark/60 font-semibold">UZS {minVal}</p>
        <div className="flex-1 border-dashed border border-dark/60 mt-1"></div>
        <p className="text-lg border-dark/60 font-semibold">UZS {maxVal}</p>
      </div>
      <div className="multi-slide-input-container" style={{ width }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => setMinVal(Math.min(+e.target.value, maxVal - 1))}
          className="thumb thumb-left"
          style={{ width }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(+e.target.value, minVal + 1))}
          className="thumb thumb-right"
          style={{ width }}
        />
        <div className="slider">
          <div className="track-slider bg-dark/10" />
          <div ref={rangeRef} className="range-slider bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
