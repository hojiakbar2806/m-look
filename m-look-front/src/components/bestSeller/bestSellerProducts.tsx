import LoadMore from "./loadMore";
import ProductGridCard from "../productCard/productGridCard";
import ProductsWrapper from "../productCard/ProductWrapper";
import ProductListCard from "../productCard/productListCard";
import React from "react";

const BestSellerProducts = async ({
  view = "grid",
}: {
  view?: "grid" | "list";
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const product = {
    id: 1,
    img: "https://picsum.photos/500/350",
    title: "Nike Airmax 270 React",
    price: 100,
    oldPrice: 200,
    rating: 3.5,
    ratingCount: 100,
    category: "category",
    description:
      "Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor ...",
    brand: "brand",
    discount: 10,
  };

  return (
    <React.Fragment>
      <ProductsWrapper view={view}>
        {[...Array(18)].map((_, i) => {
          const productWithId = { ...product, id: i };
          return view === "grid" ? (
            <ProductGridCard key={i} product={productWithId} />
          ) : (
            <ProductListCard key={i} product={productWithId} />
          );
        })}
      </ProductsWrapper>
      <LoadMore isLoading={false} />
    </React.Fragment>
  );
};

export default BestSellerProducts;
