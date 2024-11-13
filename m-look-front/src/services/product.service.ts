import axios from "axios";
import { ISearchParams } from "src/types/mixin";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/`;

const productApiInstance = axios.create({
  baseURL: BASE_URL,
});

export const SearchProduct = async (query: string) => {
  const URL = query ? `/products/?query=${query}` : "/products";
  return await productApiInstance.get(URL);
};

export const getProductsService = async (
  query: ISearchParams,
  productType: string
) => {
  const URL = query ? `product/${productType}/?query=${query}` : "/products";
  return await productApiInstance.get(URL);
};
