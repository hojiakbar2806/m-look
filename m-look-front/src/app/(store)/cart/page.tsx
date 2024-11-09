"use client";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Header from "src/components/store/home/header/header";
import useCartStore from "src/store/cartStore";

export default function CartPage() {
  const { items, incrementCartItem, decrementCartItem, removeItem } =useCartStore();

  return (
    <React.Fragment>
      <Header />
      <div className="w-full flex justify-center global-padding">
        {items.length === 0 ? (
          <div className="text-center mt-10 flex flex-col items-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
            <p className="text-gray-600 text-lg mt-4">Cart is empty</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="w-full h-20 border-b">
              <tr>
                <th className="text-left text-xl">Product</th>
                <th className="text-left text-xl">Price</th>
                <th className="text-left text-xl">Quantity</th>
                <th className="text-left text-xl">Total price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.product.id} className="border-b py-4">
                    <td className="flex items-center gap-6 py-4">
                      <button
                        className="p-1 bg-red-100 rounded-full"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X stroke="red" />
                      </button>
                      <Image
                        className="rounded-md"
                        src={item.product.img}
                        width={150}
                        height={130}
                        alt="cart img"
                      />
                      <h1 className="text-lg">{item.product.title}</h1>
                    </td>
                    <td>{item.product.price}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        <button
                          className="p-1 rounded bg-gray-300"
                          onClick={() => incrementCartItem(item.product.id)}
                        >
                          <Plus />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          className="p-1 rounded bg-gray-300"
                          onClick={() => decrementCartItem(item.product.id)}
                        >
                          <Minus />
                        </button>
                      </div>
                    </td>
                    <td>{item.product.price * item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
}
