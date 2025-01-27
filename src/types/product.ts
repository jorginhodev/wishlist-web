export type ProductDetails =
  | {
      name: string;
      description: string;
    }
  | string;

export interface Product {
  code: string;
  name: string;
  available: boolean;
  visible: boolean;
  details: ProductDetails;
  fullPriceInCents: string;
  salePriceInCents: string;
  rating: number;
  image?: string;
  stockAvailable: boolean;
}

export interface ProductsResponse {
  total: number;
  pageSize: number;
  totalPages: number;
  products: Product[];
}
