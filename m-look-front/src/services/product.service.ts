import { ISearchParams } from "src/interface/mixin";
import { IProduct } from "src/interface/product";


export const fetchProducts = async (searchParams: URLSearchParams): Promise<IProduct[]> => {
  const params: ISearchParams = {
    category: searchParams.get("category") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    maxRating: searchParams.get("maxRating") ? Number(searchParams.get("maxRating")) : undefined,
    sortBy: (searchParams.get("sortBy") as "asc" | "desc") || undefined,
    order: searchParams.get("order") || undefined,
    brand: searchParams.get("brand") || undefined,
    rating: searchParams.get("rating") || undefined,
    pageLimit: searchParams.get("pageLimit") || undefined,
    page: searchParams.get("page") || undefined,
    _limit: searchParams.get("limit") || undefined,
  };

  const filteredParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined) 
      .map(([key, value]) => [key, value]) 
  );

  const query = filteredParams.toString(); 
  const url = `https://jsonplaceholder.typicode.com/comments${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};
