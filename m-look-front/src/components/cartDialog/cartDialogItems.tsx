"use client";

import { Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "src/globalReux/feature/cartSlice";
import { addToWishList } from "src/globalReux/feature/wishListSlice";
import { RootState } from "src/globalReux/store";
import { ICartProduct } from "src/interface/product";

const CartDialogItems = ({ item }: { item: ICartProduct }) => {
  const [heartColor, setHeartColor] = useState("none");
  const wishList = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  useEffect(() => {
    const isExist = wishList.some((product) => product.id === item.id);
    if (isExist) {
      setHeartColor("red");
    } else {
      setHeartColor("none");
    }
  }, [wishList, item.id]);

  const title = item.title.slice(0, 15) + "...";

  return (
    <div className="w-full h-28 p-3 border rounded-sm flex justify-between gap-2">
      <Image className="w-1/3" src={item.img} alt="product image" width={500} height={350} />
      <div className="h-full flex-1 flex flex-col content-between justify-between">
        <div className="flex justify-between items-center">
          <h1 className="text-xl capitalize">{title}</h1>
          <button onClick={() => dispatch(addToWishList(item))}>
            <Heart strokeWidth={2.75} stroke="red" fill={heartColor} />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <h1 className="text-xl text-primary">${item.price}</h1>
          <div className="flex items-end border rounded-sm">
            <button
              className="p-1"
              onClick={() => dispatch(decrement(item.id))}
            >
              <Minus strokeWidth={2.75} />
            </button>
            <h1 className=" border-l border-r px-2 py-1">{item.quantity}</h1>
            <button
              className="p-1"
              onClick={() => dispatch(increment(item.id))}
            >
              <Plus strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDialogItems;
