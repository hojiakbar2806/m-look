import ProductsWrapper from "src/components/common/product/wrapper";
import LoadMore from "./loadMore";
import React from "react";
import ProductGridCard from "src/components/common/product/cardGrid";

const BestSellerProducts = async () => {
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
      <ProductsWrapper view={"grid"}>
        {[...Array(18)].map((_, i) => (
          <ProductGridCard key={i} product={product} />
        ))}
      </ProductsWrapper>
      <LoadMore isLoading={false} />
    </React.Fragment>
  );
};

export default BestSellerProducts;
