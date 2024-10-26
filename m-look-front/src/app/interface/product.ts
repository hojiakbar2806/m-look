export interface IProduct {
  id: number;
  img: string;
  title: string;
  price: number;
  oldPrice: number;
  rating: number;
  ratingCount: number;
  category: string;
  description: string;
  brand: string;
  discount: string;
}

export interface ICartProduct extends IProduct {
    quantity: number;
    totalPrice: number;
}

export interface IProducts {
  products: IProduct[];
}


export interface IAdsContent {
  title: string;
  discount: string;
  titl_color: string;
  img: string;
  product: IProduct[];
}


export interface IBrandNews {
  brandName: string;
  product: IProduct;
  background: string;
}