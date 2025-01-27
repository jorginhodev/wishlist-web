import { z } from "zod";

export const productDetailsSchema = z.union([
  z.object({
    name: z.string().min(1),
    description: z.string(),
  }),
  z.string(), // Adding support for string details
]);

export const productSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  available: z.boolean(),
  visible: z.boolean(),
  details: productDetailsSchema,
  fullPriceInCents: z.union([
    z.string().regex(/^\d+$/),
    z.number().transform((n) => n.toString()),
  ]),
  salePriceInCents: z.union([
    z.string().regex(/^\d+$/),
    z.number().transform((n) => n.toString()),
  ]),
  rating: z.number().min(0).max(5),
  image: z.string().url(),
  stockAvailable: z.boolean(),
});

export const productsResponseSchema = z.object({
  total: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  products: z.array(productSchema),
});

export type ProductFromSchema = z.infer<typeof productSchema>;
export type ProductsResponseFromSchema = z.infer<typeof productsResponseSchema>;
