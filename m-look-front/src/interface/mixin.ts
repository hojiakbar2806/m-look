
export interface ISearchParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  sortBy?: "asc" | "desc";
  order?: string;
  brand?: string;
  rating?: string;
  pageLimit?: string;
  page?: string;
  limit?: string;
}