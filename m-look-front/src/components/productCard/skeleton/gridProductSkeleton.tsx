import React from "react";

const GridProductSkeleton = ({ size = 8 }: { size: number }) => {
  return [...Array(size)].map((_, i) => (
    <div
      key={i}
      className="h-[350px] animate-pulse rounded-lg bg-slate-200"
    ></div>
  ));
};

export default GridProductSkeleton;
