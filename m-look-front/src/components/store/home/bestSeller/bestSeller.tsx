import React, { Suspense } from "react";
import BestSellerProducts from "./products";
import GridProductSkeleton from "src/components/common/product/skeleton/gridSkeleton";

const BestSeller = () => {
  return (
    <div className="global-padding flex flex-col w-full justify-center items-center">
      <h1 className="text-4xl text-dark ">Best Sellers</h1>
      <ul className="w-full text-dark  flex justify-center gap-14 p-10">
        <li
          data-active="true"
          className="data-[active=true]:text-primary cursor-pointer"
        >
          All
        </li>
        <li className="cursor-pointer">Bags</li>
        <li className="cursor-pointer">Sneakers</li>
        <li className="cursor-pointer">Belt</li>
        <li className="cursor-pointer">Sunglasses</li>
      </ul>

      <Suspense fallback={<GridProductSkeleton size={8} />}>
        <BestSellerProducts view="grid" />
      </Suspense>
    </div>
  );
};

export default BestSeller;
