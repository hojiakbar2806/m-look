import React, { Suspense } from "react";
import BestSellerProducts from "./products";
import GridProductSkeleton from "src/components/common/product/skeleton/gridSkeleton";

const BestSeller = () => {
  return (
    <div className="app-container">
      <h1 className="text-center text-4xl text-dark p-8">Best Sellers</h1>
      <Suspense fallback={<GridProductSkeleton size={8} />}>
        <BestSellerProducts />
      </Suspense>
    </div>
  );
};

export default BestSeller;
