import { renderHook } from "@testing-library/react";
import {
  WishlistProvider,
  useWishlist,
  useWishlistActions,
} from "./wishlist-context";
import {
  useGetWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/hooks/use-wishlist";
import { useQueryClient, QueryClient } from "@tanstack/react-query";
import type { WishlistItem } from "@/types/wishlist";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
  QueryClient: vi.fn(),
}));

vi.mock("@/hooks/use-wishlist", () => ({
  useGetWishlist: vi.fn(),
  useAddToWishlist: vi.fn(),
  useRemoveFromWishlist: vi.fn(),
}));

describe("WishlistContext", () => {
  const mockQueryClient = {
    setQueryData: vi.fn(),
    getQueryData: vi.fn(),
    setQueriesData: vi.fn(),
    getQueriesData: vi.fn(),
    invalidateQueries: vi.fn(),
    resetQueries: vi.fn(),
    cancelQueries: vi.fn(),
    removeQueries: vi.fn(),
    isFetching: vi.fn(),
    isMutating: vi.fn(),
    getDefaultOptions: vi.fn(),
    setDefaultOptions: vi.fn(),
    getQueryDefaults: vi.fn(),
    setQueryDefaults: vi.fn(),
    getMutationDefaults: vi.fn(),
    setMutationDefaults: vi.fn(),
    clear: vi.fn(),
    mount: vi.fn(),
    unmount: vi.fn(),
  } as unknown as QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <WishlistProvider>{children}</WishlistProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient);
    vi.mocked(useGetWishlist).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as unknown as UseQueryResult<WishlistItem[]>);

    const mockMutation = {
      mutate: vi.fn(),
      isLoading: false,
      isError: false,
      error: null,
      status: "idle",
      data: undefined,
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      variables: undefined,
    } as unknown as UseMutationResult<string[], Error, string>;

    vi.mocked(useAddToWishlist).mockReturnValue(mockMutation);
    vi.mocked(useRemoveFromWishlist).mockReturnValue(mockMutation);
  });

  it("should provide wishlist data", () => {
    const mockWishlist: WishlistItem[] = [
      {
        id: 1,
        productCode: "123",
        product: {
          code: "123",
          name: "Test Product",
          available: true,
          visible: true,
          details: {
            name: "Test Product",
            description: "Test Description",
          },
          fullPriceInCents: "10000",
          salePriceInCents: "9000",
          rating: 4.5,
          image: "test.jpg",
          stockAvailable: true,
        },
      },
    ];

    vi.mocked(useGetWishlist).mockReturnValue({
      data: mockWishlist,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as UseQueryResult<WishlistItem[]>);

    const { result } = renderHook(() => useWishlist(), { wrapper });

    expect(result.current.wishlist).toEqual(mockWishlist);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    vi.mocked(useGetWishlist).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      status: "loading",
    } as unknown as UseQueryResult<WishlistItem[]>);

    const { result } = renderHook(() => useWishlist(), { wrapper });

    expect(result.current.wishlist).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  describe("isInWishlist", () => {
    it("should return true when product is in wishlist", () => {
      vi.mocked(useGetWishlist).mockReturnValue({
        data: [
          {
            id: 1,
            productCode: "123",
            product: {
              code: "123",
              name: "Test Product",
              available: true,
              visible: true,
              details: {
                name: "Test Product",
                description: "Test Description",
              },
              fullPriceInCents: "10000",
              salePriceInCents: "9000",
              rating: 4.5,
              image: "test.jpg",
              stockAvailable: true,
            },
          },
        ],
        isLoading: false,
        isError: false,
        error: null,
        status: "success",
      } as UseQueryResult<WishlistItem[]>);

      const { result } = renderHook(() => useWishlistActions(), { wrapper });

      expect(result.current.isInWishlist("123")).toBe(true);
    });

    it("should return false when product is not in wishlist", () => {
      vi.mocked(useGetWishlist).mockReturnValue({
        data: [
          {
            id: 1,
            productCode: "456",
            product: {
              code: "456",
              name: "Test Product",
              available: true,
              visible: true,
              details: {
                name: "Test Product",
                description: "Test Description",
              },
              fullPriceInCents: "10000",
              salePriceInCents: "9000",
              rating: 4.5,
              image: "test.jpg",
              stockAvailable: true,
            },
          },
        ],
        isLoading: false,
        isError: false,
        error: null,
        status: "success",
      } as UseQueryResult<WishlistItem[]>);

      const { result } = renderHook(() => useWishlistActions(), { wrapper });

      expect(result.current.isInWishlist("123")).toBe(false);
    });
  });
});
