import { z } from "zod";
import { productSchema } from "./product";

export const wishlistItemSchema = z.object({
  id: z.number().int().positive(),
  productCode: z.string().min(1),
  product: productSchema,
});

export const wishlistResponseSchema = z.array(wishlistItemSchema);

export type WishlistItemFromSchema = z.infer<typeof wishlistItemSchema>;
