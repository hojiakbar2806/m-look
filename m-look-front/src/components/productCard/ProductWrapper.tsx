import React from "react";

interface ProductsWrapperProps {
  view?: "grid" | "list";
  children: React.ReactNode;
}

const ProductsWrapper: React.FC<ProductsWrapperProps> = ({
  view = "grid",
  children,
}) => {
  const viewClasses = {
    grid: "grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4",
    list: "grid grid-cols-1 gap-4",
  };
  return <div className={`w-full ${viewClasses[view]}`}>{children}</div>;
};

export default ProductsWrapper;
