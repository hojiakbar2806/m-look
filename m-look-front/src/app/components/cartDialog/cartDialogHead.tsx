import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeCartDialog } from "src/app/globalReux/feature/cartSlice";

const CartDialogHead = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-between items-center p-6 border-b">
      <button onClick={() => dispatch(closeCartDialog())}>
        <X strokeWidth={2.75} />
      </button>

      <h1 className="text-2xl">Your Cart</h1>
    </div>
  );
};

export default CartDialogHead;
