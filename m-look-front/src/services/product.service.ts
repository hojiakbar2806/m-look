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

  const filteredParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined) 
      .map(([key, value]) => [key, value]) 
  );

  const query = filteredParams.toString(); 
  const url = `http://localhost:8000/api/`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};
