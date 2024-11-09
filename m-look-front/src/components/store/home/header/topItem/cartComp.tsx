"use client";

import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import useCartStore from "src/store/cartStore";

const CartComp = () => {
  const { getItemCount, setCartDialog } = useCartStore();
  const [isClinet, seIsClient] = useState(false);

  const totalItems = getItemCount();

  useEffect(() => {
    seIsClient(true);
  }, []);

  if (!isClinet) {
    return (
      <React.Fragment>
        <li className="flex relative cursor-pointer items-center gap-2">
          <ShoppingCart className="text-dark size-4 md:size-6" />
          <span className="absolute grid place-items-center left-4 -top-2 h-5 w-5 text-white rounded-full bg-secondary text-[12px] border border-white">
            0
          </span>
        </li>

        {/* <li className="flex items-center text-sm md:text-lg lg:text-xl gap-2">
          <span className="text-dark">Items:</span>
          <span className="font-light text-dark/50">0$</span>
        </li> */}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <li
        className="flex relative cursor-pointer items-center gap-2"
        onClick={() => setCartDialog(true)}
      >
        <ShoppingCart className="text-dark size-4 md:size-6" />
        <span className="absolute grid place-items-center left-4 -top-2 h-5 w-5 text-white rounded-full bg-secondary text-[12px] border border-white">
          {totalItems}
        </span>
      </li>
      {/* 
      <li className="flex items-center text-sm md:text-lg lg:text-xl gap-2">
        <span className="text-dark">Items:</span>
        <span className="font-light text-dark/50">{totalPrice}$</span>
      </li> */}
    </React.Fragment>
  );
};

export default CartComp;
