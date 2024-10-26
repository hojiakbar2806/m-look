import LoadMore from "./loadMore";
import ProductGridCard from "../productCard/productGridCard";
import ProductsWrapper from "../productCard/ProductWrapper";

const BestSellerProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = {
    id: 1,
    img: "https://picsum.photos/500/350",
    title: "product name",
    price: 100,
    oldPrice: 200,
    rating: 3.5,
    ratingCount: 100,
    category: "category",
    description: "product description",
    brand: "brand",
    discount: "10%",
  };

  return (
    <div>
      <ProductsWrapper view={"grid"}>
        {[...Array(8)].map((_, i) => {
          return <ProductGridCard key={i} product={{ ...product, id: i }} />;
        })}
      </ProductsWrapper>
      <LoadMore isLoading={false} />
    </div>
  );
};

export default BestSellerProducts;
