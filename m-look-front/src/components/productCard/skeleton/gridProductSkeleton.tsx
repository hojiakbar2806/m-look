import React from "react";
import ProductsWrapper from "../ProductWrapper";

const GridProductSkeleton = ({ size = 8 }: { size: number }) => {
  return (
    <ProductsWrapper view={"grid"}>
      {[...Array(size)].map((_, i) => (
        <div
          key={i}
          className="h-[350px] animate-pulse rounded-lg bg-slate-200"
        ></div>
      ))}
    </ProductsWrapper>
  );
};

export default GridProductSkeleton;
