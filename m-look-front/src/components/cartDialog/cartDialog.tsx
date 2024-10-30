"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";
import CartDialogHead from "./cartDialogHead";
import DialogWrapper from "../dialog";
import CartDialogItems from "./cartDialogItems";
import { closeCartDialog } from "src/globalReux/feature/cartSlice";
import { useEffect, useState } from "react";
import { ICart } from "src/interface/product";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartDialog = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cart, cartDialogState } = useSelector(
    (state: RootState) => state.cart
  );

  const [cartItems, setCartItems] = useState<ICart>({
    products: [],
    totalPrice: 0,
  });

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  return (
    <DialogWrapper
      dialogState={cartDialogState}
      onClose={() => dispatch(closeCartDialog())}
    >
      <div className="w-full flex flex-col gap-2 items-center">
        <CartDialogHead />
        <div className="w-full p-2 flex flex-col gap-2">
          {cartItems.products.map((product) => (
            <CartDialogItems key={product.id} item={product} />
          ))}
        </div>
        {cartItems.products.length > 0 && (
          <div className="w-full flex justify-between items-center p-2">
            <button
              onClick={() => router.push("/cart")}
              className="px-6 flex items-center gap-2 font-bold text-lg py-3 rounded transition-colors hover:bg-accent/50 text-primary"
            >
              Go to Cart <ArrowRight strokeWidth={2.75} />
            </button>
            <h2 className="text-xl font-bold">
              Total: ${cartItems.totalPrice}
            </h2>
          </div>
        )}
        {cartItems.products.length === 0 && (
          <div className="flex items-center justify-center gap-4 ">
            <ShoppingCart strokeWidth={2.75} />
            <h1 className="text-xl font-medium">Your cart is empty</h1>
          </div>
        )}
      </div>
    </DialogWrapper>
  );
};

export default CartDialog;
