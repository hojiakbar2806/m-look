import { ISearchParams } from "src/types/mixin";
import apiAgent from "./api.service";

export const SearchProduct = async (query: string) => {
  const URL = query ? `/products/?query=${query}` : "/products";
  return await apiAgent.get(URL);
};

export const getProductsService = async (
  query: ISearchParams,
  productType: string
) => {
  const URL = query ? `product/${productType}/?query=${query}` : "/products";
  return await apiAgent.get(URL);
};
