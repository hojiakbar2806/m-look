"use client";

import DialogWrapper from "../../common/dialog";
import CartDialogItems from "./items";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartStore from "src/store/cartStore";

const CartDialog = (): JSX.Element => {
  const { setCartDialog, getTotalPrice, cartDialog, items } = useCartStore();
  const router = useRouter();

  const totalPrice = getTotalPrice();

  return (
    <DialogWrapper
      dialogState={cartDialog ? "open" : "close"}
      onClose={() => setCartDialog(false)}
    >
      <div className="w-full flex flex-col gap-2 items-center">
        <div className="w-full flex justify-between items-center p-6 border-b">
          <button onClick={() => setCartDialog(false)}>
            <X strokeWidth={2.75} />
          </button>

          <h1 className="text-2xl">Your Cart</h1>
        </div>
        <div className="w-full p-2 flex flex-col gap-2">
          {items.map((item) => (
            <CartDialogItems key={item.product.id} item={item} />
          ))}
        </div>
        {items.length > 0 && (
          <div className="w-full flex justify-between items-center p-2">
            <button
              onClick={() => {
                router.push("/cart");
                setCartDialog(false);
              }}
              className="px-6 flex items-center gap-2 font-bold text-lg py-3 rounded transition-colors hover:bg-accent/50 text-primary"
            >
              Go to Cart <ArrowRight strokeWidth={2.75} />
            </button>
            <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
          </div>
        )}
        {items.length === 0 && (
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
