"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";
import CartDialogHead from "./cartDialogHead";
import DialogWrapper from "../dialog";
import CartDialogItems from "./cartDialogItems";
import { closeCartDialog } from "src/globalReux/feature/cartSlice";
import { useEffect, useState } from "react";
import { ICartProduct, IProducts } from "src/interface/product";

const CartDialog = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<ICartProduct[]>([]);

  const { cart, cartDialogState } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.products);
  }, [cart.products]);

  return (
    <DialogWrapper
      dialogState={cartDialogState}
      onClose={() => dispatch(closeCartDialog())}
    >
      <div className="w-full flex flex-col gap-2">
        <CartDialogHead />
        <div className="p-2 flex flex-col gap-2">
          {cartItems.map((product) => (
            <CartDialogItems key={product.id} item={product} />
          ))}
        </div>
      </div>
    </DialogWrapper>
  );
};

export default CartDialog;
