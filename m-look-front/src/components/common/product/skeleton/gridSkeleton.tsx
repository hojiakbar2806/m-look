import React from "react";

type ProductSkeletonProps = {
  size: number;
};

const GridProductSkeleton: React.FC<ProductSkeletonProps> = ({ size = 8 }) => {
  return [...Array(size)].map((_, i) => (
    <div
      key={i}
      className="h-[350px] animate-pulse rounded-lg bg-slate-200"
    ></div>
  ));
};

export default GridProductSkeleton;
