import type { Product } from "./product";

export interface ProductCardProps extends Product {
  isWishlist: boolean;
}
