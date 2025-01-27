import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlist";
import { queryClient } from "@/lib/query-client";
import { WishlistItem } from "@/types/wishlist";

export function useGetWishlist(): UseQueryResult<WishlistItem[]> {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
}

export function useAddToWishlist() {
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useRemoveFromWishlist() {
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}
