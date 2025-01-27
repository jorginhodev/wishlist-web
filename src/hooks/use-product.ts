import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product";
import { useErrorHandler } from "./use-error-handler";
import type { ProductsResponseFromSchema } from "@/schemas/product";

export const PRODUCTS_QUERY_KEY = ["products"] as const;
export const PRODUCTS_STALE_TIME = 1000 * 60 * 5;
export const PRODUCTS_CACHE_TIME = 1000 * 60 * 30;

export function useGetProducts() {
  const handleError = useErrorHandler();

  const query = useQuery<ProductsResponseFromSchema>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: ({ signal }) =>
      getProducts({
        queryKey: [...PRODUCTS_QUERY_KEY],
        signal,
        meta: { errorHandler: handleError },
      }),
    staleTime: PRODUCTS_STALE_TIME,
    gcTime: PRODUCTS_CACHE_TIME,
    retry: false,
  });

  if (query.isLoading) {
    return { status: "loading" } as const;
  }

  if (query.error) {
    return {
      status: "error",
      error: query.error,
    } as const;
  }

  return {
    status: "success",
    data: query.data,
  } as const;
}
