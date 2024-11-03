"use client";

import BestSellerCard from "./bestSellerCard";
import BrandCard from "./brandCard";
import ColorCard from "./colorCard";
import PriceCard from "./priceCard";
import { useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";
import SizeCard from "./sizeCard";

const Category = () => {
  const navbarState = useSelector((state: RootState) => state.navbarHeight);

  return (
    <div
      data-state={navbarState.isTop}
      className="category data-[state=true]:top-28 data-[state=true]:h-[calc(100vh-150px)] h-[calc(100vh-130px)] overflow-y-auto rounded-lg w-80  flex flex-col gap-2 top-16 sticky transition-all duration-300 py-4"
    >
      <BestSellerCard />
      <ColorCard colors={["red", "blue", "green", "yellow"]} />
      <SizeCard sizes={["XS", "S", "M", "L", "XL", "XXL"]} />
      <PriceCard min={0} max={100} width="260px" />
      <BrandCard />
    </div>
  );
};

export default Category;
