"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { PRODUCTS_QUERY_KEY } from "@/hooks/use-product";
import {
  useGetWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/hooks/use-wishlist";
import type { ProductsResponseFromSchema } from "@/schemas/product";
import type { WishlistItem } from "@/types/wishlist";
import { queryClient } from "@/lib/query-client";

interface WishlistContextData {
  wishlist: WishlistItem[];
  isLoading: boolean;
}

interface WishlistActionsContextData {
  toggleWishlist: (productCode: string) => void;
  isInWishlist: (productCode: string) => boolean;
}

const WishlistContext = createContext({} as WishlistContextData);
const WishlistActionsContext = createContext({} as WishlistActionsContextData);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: wishlist = [], isLoading } = useGetWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  const toggleWishlist = useCallback(
    (productCode: string) => {
      const isInWishlist = wishlist.some(
        (item) => item.productCode === productCode,
      );

      queryClient.setQueryData<ProductsResponseFromSchema>(
        PRODUCTS_QUERY_KEY,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            products: oldData.products.map((product) => {
              if (product.code === productCode) {
                return {
                  ...product,
                  isWishlist: !isInWishlist,
                };
              }
              return product;
            }),
          };
        },
      );

      if (isInWishlist) {
        removeFromWishlist(productCode);
      } else {
        addToWishlist(productCode);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient, wishlist, addToWishlist, removeFromWishlist],
  );

  const isInWishlist = useCallback(
    (productCode: string) => {
      return wishlist.some((item) => item.productCode === productCode);
    },
    [wishlist],
  );

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading }}>
      <WishlistActionsContext.Provider value={{ toggleWishlist, isInWishlist }}>
        {children}
      </WishlistActionsContext.Provider>
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

export function useWishlistActions() {
  return useContext(WishlistActionsContext);
}
