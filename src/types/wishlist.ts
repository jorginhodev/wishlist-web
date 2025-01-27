import { Product } from "./product";

export interface WishlistItem {
  id: number;
  productCode: string;
  product: Product;
}
