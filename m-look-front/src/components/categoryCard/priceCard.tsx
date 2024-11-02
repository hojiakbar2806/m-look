import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useRef } from "react";

interface PriceCardProps {
  min: number;
  max: number;
  width: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ min, max, width }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement | null>(null);

  const currencyText = "UZS";

  const onChange = (e: { min: number; max: number }) => {
    params.set("min", e.min.toString());
    params.set("max", e.max.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (minVal !== minValRef.current || maxVal !== maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      console.log(`Min: ${minVal}, Max: ${maxVal}`);
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-6 p-4 pb-8 bg-gray-100 rounded">
      <div className="w-full px-4 flex items-center justify-between gap-x-5">
        <p className="text-lg border-dark/60 font-semibold">
          {currencyText} {minVal}
        </p>

        <div className="flex-1 border-dashed border border-dark/60 mt-1"></div>

        <p className="text-lg border-dark/60 font-semibold">
          {currencyText} {maxVal}
        </p>
      </div>

      <div className="multi-slide-input-container" style={{ width }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
          }}
          className="thumb thumb-left"
          style={{
            width,
            zIndex: minVal > max - 100 || minVal === maxVal ? 5 : undefined,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
          }}
          className="thumb thumb-right"
          style={{
            width,
            zIndex: minVal > max - 100 || minVal === maxVal ? 4 : undefined,
          }}
        />

        <div className="slider">
          <div className="track-slider bg-dark/10" />

          <div ref={range} className="range-slider bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
