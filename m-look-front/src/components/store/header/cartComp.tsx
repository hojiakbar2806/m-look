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

  return (
    <li
      onClick={() => setCartDialog(true)}
      data-items={isClinet ? totalItems : 0}
      className="relative cursor-pointer
        after:w-4 after:h-4 after-text-center
        after:bg-red-500 after:border after:border-white after:text-white after:text-xs after:grid after:place-items-center
        after:absolute after:content-[attr(data-items)] after:rounded-full after:-top-2 after:-right-2 after:aspect-square"
    >
      <ShoppingCart className="app-icon" />
    </li>
  );
};

export default CartComp;
