import { ISearchParams } from "src/interface/mixin";
import { IProduct } from "src/interface/product";


export const fetchProducts = async (searchParams: URLSearchParams): Promise<IProduct[]> => {
  const params: ISearchParams = {
    category: searchParams.get("category") || undefined,
    min_price: searchParams.get("min_price") || undefined,
    max_price: searchParams.get("max_price") || undefined,
    min_rating: searchParams.get("min_rating") || undefined,
    max_rating: searchParams.get("max_rating") || undefined,
    color: searchParams.get("color") || undefined,
    sortBy: (searchParams.get("sortBy") as "asc" | "desc") || undefined,
    brand: searchParams.get("brand") || undefined,
    page_size: searchParams.get("page_size") || undefined,
    page: searchParams.get("page") || undefined,
    limit: searchParams.get("limit") || undefined,
    best_seller: searchParams.get("best_seller") || undefined,  
  };

  const query = new URLSearchParams(params.toString());

  console.log(query)


  const url = `http://localhost:8000/api/products/`;

  const response = await fetch(url);
  return await response.json();

};
