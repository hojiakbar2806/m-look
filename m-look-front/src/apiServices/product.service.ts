import { IProduct } from "src/interface/product";

export const fetchProducts = async ({ searchParams, productType }: { searchParams: URLSearchParams; productType: string }): Promise<IProduct[]> => {
  const query = searchParams.toString(); 
  const url = `https://jsonplaceholder.typicode.com/comments${query ? `?${query}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
};
