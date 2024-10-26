import ProductGridCard from "./productGridCard";
import ProductsWrapper from "./ProductWrapper";

interface ProductsWrapperProps {
  view?: "grid" | "list";
}

const Products = async ({ view = "grid" }: ProductsWrapperProps) => {
  return (
    <></>
    // <ProductsWrapper view={view}>
    //   {[...Array(8)].map((_, i) => (
    //     <ProductGridCard key={i} />
    //   ))}
    // </ProductsWrapper>
  );
};

export default Products;
