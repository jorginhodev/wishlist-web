import { renderHook } from "@testing-library/react";
import { useErrorHandler } from "./use-error-handler";
import { toast } from "sonner";
import { APIError, NetworkError, ValidationError } from "@/lib/errors";
import { vi } from "vitest";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("useErrorHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle APIError", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new APIError(
      "API Error",
      500,
      "Erro no servidor",
      "Detalhes do erro",
    );

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith("API Error");
  });

  it("should handle NetworkError", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new NetworkError("Network Error");

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Erro de conexão. Por favor, verifique sua internet.",
    );
  });

  it("should handle ValidationError", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new ValidationError("Validation Error", "Erro de validação");

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith("Validation Error");
  });

  it("should handle unknown errors", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new Error("Unknown Error");

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Ocorreu um erro inesperado. Por favor, tente novamente.",
    );
  });

  it("should handle APIError with custom message", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new APIError(
      "Custom API Error",
      400,
      "Dados inválidos",
      "Detalhes do erro",
    );

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith("Custom API Error");
  });

  it("should handle ValidationError with custom message", () => {
    const { result } = renderHook(() => useErrorHandler());
    const error = new ValidationError(
      "Custom Validation Error",
      "Formato inválido",
    );

    result.current(error);

    expect(toast.error).toHaveBeenCalledWith("Custom Validation Error");
  });
});
