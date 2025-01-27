import { getWishlist, addToWishlist, removeFromWishlist } from "./wishlist";
import { httpClient } from "@/lib/http-client";
import { vi } from "vitest";

vi.mock("@/lib/http-client", () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Wishlist Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getWishlist", () => {
    it("should fetch wishlist successfully", async () => {
      const mockResponse = {
        data: ["123", "456"],
      };

      vi.mocked(httpClient.get).mockResolvedValueOnce(mockResponse);

      const result = await getWishlist();

      expect(result).toEqual(mockResponse.data);
      expect(httpClient.get).toHaveBeenCalledWith("/wishlist");
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it("should handle error when fetching wishlist", async () => {
      const error = new Error("Failed to fetch wishlist");
      vi.mocked(httpClient.get).mockRejectedValueOnce(error);

      await expect(getWishlist()).rejects.toThrow("Failed to fetch wishlist");
    });
  });

  describe("addToWishlist", () => {
    it("should add product to wishlist successfully", async () => {
      const productCode = "123";
      const mockResponse = {
        data: ["123"],
      };

      vi.mocked(httpClient.post).mockResolvedValueOnce(mockResponse);

      const result = await addToWishlist(productCode);

      expect(result).toEqual(mockResponse.data);
      expect(httpClient.post).toHaveBeenCalledWith("/wishlist", {
        code: productCode,
      });
      expect(httpClient.post).toHaveBeenCalledTimes(1);
    });

    it("should handle error when adding product to wishlist", async () => {
      const productCode = "123";
      const error = new Error("Failed to add product to wishlist");
      vi.mocked(httpClient.post).mockRejectedValueOnce(error);

      await expect(addToWishlist(productCode)).rejects.toThrow(
        "Failed to add product to wishlist",
      );
    });
  });

  describe("removeFromWishlist", () => {
    it("should remove product from wishlist successfully", async () => {
      const productCode = "123";
      const mockResponse = {
        data: [],
      };

      vi.mocked(httpClient.delete).mockResolvedValueOnce(mockResponse);

      const result = await removeFromWishlist(productCode);

      expect(result).toEqual(mockResponse.data);
      expect(httpClient.delete).toHaveBeenCalledWith(
        `/wishlist/${productCode}`,
      );
      expect(httpClient.delete).toHaveBeenCalledTimes(1);
    });

    it("should handle error when removing product from wishlist", async () => {
      const productCode = "123";
      const error = new Error("Failed to remove product from wishlist");
      vi.mocked(httpClient.delete).mockRejectedValueOnce(error);

      await expect(removeFromWishlist(productCode)).rejects.toThrow(
        "Failed to remove product from wishlist",
      );
    });
  });
});
