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
  discount: number;
}

export interface ICartProduct extends IProduct {
    quantity: number;
    totalPrice: number;
}

export interface ICart {
  products: ICartProduct[];
  totalPrice: number;
}

export interface IProducts {
  products: IProduct[];
}


export interface IAdsContent {
  title: string;
  discount: string;
  title_color: string;
  img: string;
  products: IProduct[];
}


export interface IBrandNews {
  brandName: string;
  product: IProduct;
  background: string;
}