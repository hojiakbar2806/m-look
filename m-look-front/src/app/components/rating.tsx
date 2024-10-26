"use client";

import React, { useState } from "react";
import { cn } from "src/lib/utils";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  isReadOnly?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  isReadOnly = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = (newValue: number) => {
    if (!isReadOnly) {
      setHoverValue(newValue);
    }
  };

  const handleMouseLeave = () => {
    if (!isReadOnly) {
      setHoverValue(null);
    }
  };

  const handleClick = (ratingValue: number) => {
    if (onChange) {
      onChange(ratingValue);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: 5 }, (_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              value={ratingValue}
              checked={value === ratingValue}
              onChange={() => handleClick(ratingValue)}
              className="hidden"
              disabled={isReadOnly}
            />
            <svg
              className={cn("w-8 h-8 cursor-pointer", {
                "text-yellow-400": ratingValue <= (hoverValue || value),
                "text-gray-300": ratingValue > (hoverValue || value),
              })}
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => !isReadOnly && handleClick(ratingValue)}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
