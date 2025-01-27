import { httpClient } from "./http-client";
import { APIError } from "./errors";

describe("httpClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle successful GET requests", async () => {
    const mockResponse = { data: { message: "success" } };
    vi.spyOn(httpClient, "get").mockResolvedValueOnce(mockResponse);

    const response = await httpClient.get("/test");

    expect(response).toEqual(mockResponse);
    expect(httpClient.get).toHaveBeenCalledWith("/test");
  });

  it("should throw APIError on server error", async () => {
    vi.spyOn(httpClient, "get").mockRejectedValueOnce(
      new APIError("Network connection failed", 500, "INTERNAL_SERVER_ERROR"),
    );

    await expect(httpClient.get("/test")).rejects.toThrow(APIError);
    await expect(httpClient.get("/test")).rejects.toThrow(
      "Network connection failed",
    );
  });

  it("should handle POST requests with body", async () => {
    const mockResponse = { data: { message: "created" } };
    const mockBody = { name: "test" };

    vi.spyOn(httpClient, "post").mockResolvedValueOnce(mockResponse);

    const response = await httpClient.post("/test", mockBody);

    expect(response).toEqual(mockResponse);
    expect(httpClient.post).toHaveBeenCalledWith("/test", mockBody);
  });
});
