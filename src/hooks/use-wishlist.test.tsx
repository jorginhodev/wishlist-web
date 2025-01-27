import { renderHook, waitFor } from "@testing-library/react";
import {
  useGetWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "./use-wishlist";
import { queryClient } from "@/lib/query-client";
import { vi } from "vitest";
import * as wishlistService from "@/services/wishlist";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

vi.mock("@/services/wishlist", () => ({
  getWishlist: vi.fn(),
  addToWishlist: vi.fn(),
  removeFromWishlist: vi.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Wishlist Hooks", () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  describe("useGetWishlist", () => {
    it("should fetch wishlist items", async () => {
      const mockItems = ["123", "456"];
      vi.mocked(wishlistService.getWishlist).mockResolvedValueOnce(mockItems);

      const { result } = renderHook(() => useGetWishlist(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockItems);
      });
      expect(wishlistService.getWishlist).toHaveBeenCalledTimes(1);
    });

    it("should handle error state", async () => {
      const error = new Error("Failed to fetch");
      vi.mocked(wishlistService.getWishlist).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useGetWishlist(), { wrapper });

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });
    });
  });

  describe("useAddToWishlist", () => {
    it("should add item to wishlist", async () => {
      const productCode = "123";
      vi.mocked(wishlistService.addToWishlist).mockResolvedValueOnce(["123"]);

      queryClient.setQueryData(["wishlist"], []);

      const { result } = renderHook(() => useAddToWishlist(), { wrapper });

      result.current.mutate(productCode);

      await waitFor(() => {
        expect(wishlistService.addToWishlist).toHaveBeenCalledWith(productCode);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(queryClient.getQueryState(["wishlist"])?.isInvalidated).toBe(true);
    });
  });

  describe("useRemoveFromWishlist", () => {
    it("should remove item from wishlist", async () => {
      const productCode = "123";
      vi.mocked(wishlistService.removeFromWishlist).mockResolvedValueOnce([]);

      queryClient.setQueryData(["wishlist"], ["123"]);

      const { result } = renderHook(() => useRemoveFromWishlist(), { wrapper });

      result.current.mutate(productCode);

      await waitFor(() => {
        expect(wishlistService.removeFromWishlist).toHaveBeenCalledWith(
          productCode,
        );
        expect(result.current.isSuccess).toBe(true);
      });

      expect(queryClient.getQueryState(["wishlist"])?.isInvalidated).toBe(true);
    });
  });
});
