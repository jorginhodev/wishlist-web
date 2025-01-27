import { httpClient } from "@/lib/http-client";
import { APIError, NetworkError, ValidationError } from "@/lib/errors";
import { productsResponseSchema } from "@/schemas/product";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { QueryMetadata } from "@/types/query";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error: unknown, retryCount: number): boolean => {
  if (retryCount >= MAX_RETRIES) return false;

  if (error instanceof NetworkError) return true;
  if (error instanceof APIError) {
    return error.statusCode >= 500 || [408, 429].includes(error.statusCode);
  }

  return false;
};

export async function getProducts(
  context: QueryFunctionContext<["products"]> & { meta?: QueryMetadata },
) {
  let retryCount = 0;

  while (true) {
    try {
      const response = await httpClient.get("/products");

      const validationResult = productsResponseSchema.safeParse(response.data);

      if (!validationResult.success) {
        throw new ValidationError(
          "Resposta da API inválida",
          undefined,
          validationResult.error,
        );
      }

      return validationResult.data;
    } catch (error) {
      if (shouldRetry(error, retryCount)) {
        retryCount++;
        await wait(RETRY_DELAY * retryCount);
        continue;
      }

      if (context.meta?.errorHandler) {
        context.meta.errorHandler(error);
      }

      throw error;
    }
  }
}
