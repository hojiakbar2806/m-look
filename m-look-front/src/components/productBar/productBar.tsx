"use client";

type ProductBarProps = {
  productLength: number;
};

const ProductBar = ({ productLength }: ProductBarProps) => {
  return (
    <div className="flex-1 h-32 z-20 p-10 bg-slate-300 sticky rounded-md">
      <p>{productLength} Items</p>
    </div>
  );
};

export default ProductBar;
