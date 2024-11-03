
export interface ISearchParams {
  category?: string;
  min_price?: string;
  max_price?: string;
  min_rating?: string;
  max_rating?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  brand?: string;
  page_size?: string;
  page?: string;
  limit?: string;
  color?: string;
  best_seller?: string;
}