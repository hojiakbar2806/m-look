import { cn } from "src/utils/utils";
import React from "react";

interface ProductsWrapperProps {
  view?: "grid" | "list";
  children: React.ReactNode;
  className?: string;
}

const ProductWrapper: React.FC<ProductsWrapperProps> = ({
  view = "grid",
  className,
  children,
}) => {
  const viewClasses = {
    grid: "grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4",
    list: "grid grid-cols-1 gap-4",
  };
  return (
    <div className={cn("w-full", viewClasses[view], className)}>{children}</div>
  );
};

export default ProductWrapper;
