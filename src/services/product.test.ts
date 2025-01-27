import { APIError, NetworkError, ValidationError } from "@/lib/errors";
import { getProducts } from "./product";
import { httpClient } from "@/lib/http-client";

vi.mock("@/lib/http-client", () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

describe("Product Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockContext = {
    queryKey: ["products"] as ["products"],
    signal: new AbortController().signal,
    meta: {
      errorHandler: vi.fn(),
    },
  };

  const mockValidResponse = {
    data: {
      products: [
        {
          code: "TENIS-001",
          name: "Tênis Nike Test",
          image: "https://example.com/images/tenis-test.jpg",
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
    },
  };

  it("should fetch products successfully", async () => {
    vi.mocked(httpClient.get).mockResolvedValueOnce(mockValidResponse);

    const result = await getProducts(mockContext);

    expect(result).toEqual(mockValidResponse.data);
    expect(httpClient.get).toHaveBeenCalledWith("/products");
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it("should retry on network error", async () => {
    const networkError = new NetworkError("Connection failed");
    vi.mocked(httpClient.get)
      .mockRejectedValueOnce(networkError)
      .mockResolvedValueOnce(mockValidResponse);

    const promise = getProducts(mockContext);

    await vi.advanceTimersByTimeAsync(1000);

    const result = await promise;

    expect(result).toEqual(mockValidResponse.data);
    expect(httpClient.get).toHaveBeenCalledTimes(2);
  });

  it("should retry on 500 error", async () => {
    const apiError = new APIError("Server Error", 500, "Internal Server Error");
    vi.mocked(httpClient.get)
      .mockRejectedValueOnce(apiError)
      .mockResolvedValueOnce(mockValidResponse);

    const promise = getProducts(mockContext);

    await vi.advanceTimersByTimeAsync(1000);

    const result = await promise;

    expect(result).toEqual(mockValidResponse.data);
    expect(httpClient.get).toHaveBeenCalledTimes(2);
  });

  it("should not retry on validation error", async () => {
    const validationError = new ValidationError("Invalid response");
    vi.mocked(httpClient.get).mockRejectedValueOnce(validationError);

    await expect(getProducts(mockContext)).rejects.toThrow(ValidationError);
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });
});
