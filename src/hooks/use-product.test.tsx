import { renderHook, waitFor } from "@testing-library/react";
import { useGetProducts } from "./use-product";
import { queryClient } from "@/lib/query-client";
import { vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { getProducts } from "@/services/product";

vi.mock("@/services/product", () => ({
  getProducts: vi.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetProducts", () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it("should fetch products successfully", async () => {
    const mockProducts = {
      products: [
        {
          code: "TENIS-001",
          name: "Tênis Nike Test",
          image: "/images/tenis-test.jpg",
          fullPriceInCents: "29990",
          salePriceInCents: "19990",
          rating: 4,
          available: true,
          stockAvailable: true,
          visible: true,
          details: {
            name: "Tênis Nike Test",
            description: "Tênis para corrida com tecnologia de amortecimento",
          },
        },
      ],
      total: 1,
      pageSize: 10,
      totalPages: 1,
    };

    vi.mocked(getProducts).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useGetProducts(), { wrapper });

    // Inicialmente deve estar carregando
    expect(result.current.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.data).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  it("should handle error state", async () => {
    const error = new Error("Failed to fetch products");
    vi.mocked(getProducts).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useGetProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error).toBeDefined();
  });

  it("should update data when query is invalidated", async () => {
    const initialProducts = {
      products: [
        {
          code: "TENIS-001",
          name: "Tênis Nike Test",
          image: "/images/tenis-test.jpg",
          fullPriceInCents: "29990",
          salePriceInCents: "19990",
          rating: 4,
          available: true,
          stockAvailable: true,
          visible: true,
          details: {
            name: "Tênis Nike Test",
            description: "Tênis para corrida com tecnologia de amortecimento",
          },
        },
      ],
      total: 1,
      pageSize: 10,
      totalPages: 1,
    };

    const updatedProducts = {
      ...initialProducts,
      products: [
        ...initialProducts.products,
        {
          code: "TENIS-002",
          name: "Tênis Nike Test 2",
          image: "/images/tenis-test-2.jpg",
          fullPriceInCents: "39990",
          salePriceInCents: "29990",
          rating: 5,
          available: true,
          stockAvailable: true,
          visible: true,
          details: {
            name: "Tênis Nike Test 2",
            description: "Tênis para corrida com tecnologia de amortecimento",
          },
        },
      ],
      total: 2,
    };

    vi.mocked(getProducts)
      .mockResolvedValueOnce(initialProducts)
      .mockResolvedValueOnce(updatedProducts);

    const { result } = renderHook(() => useGetProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
      expect(result.current.data).toEqual(initialProducts);
    });

    // Invalida a query para forçar uma nova requisição
    queryClient.invalidateQueries({ queryKey: ["products"] });

    await waitFor(() => {
      expect(result.current.data).toEqual(updatedProducts);
    });

    expect(getProducts).toHaveBeenCalledTimes(2);
  });
});
