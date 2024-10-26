import React, { Suspense } from "react";
import Wrapper from "../wrapper";
import BestSellerProducts from "./bestSellerProducts";
import GridSkeleton from "../productCard/skeleton/gridSkeleton";

const BestSeller = () => {
  return (
    <Wrapper className="flex flex-col items-center">
      <h1 className="text-4xl">Best Sellers</h1>
      <ul className="w-full flex justify-center gap-14 p-10">
        <li className="cursor-pointer text-skyblue text-responsive">All</li>
        <li className="cursor-pointer text-responsive">Bags</li>
        <li className="cursor-pointer text-responsive">Sneakers</li>
        <li className="cursor-pointer text-responsive">Belt</li>
        <li className="cursor-pointer text-responsive">Sunglasses</li>
      </ul>

      <Suspense fallback={<GridSkeleton size={8} />}>
        <BestSellerProducts />
      </Suspense>
    </Wrapper>
  );
};

export default BestSeller;
