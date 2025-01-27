import axios, { AxiosError } from "axios";
import { env } from "@/lib/env";
import { APIError, NetworkError } from "./errors";
import type { APIErrorResponse } from "@/types/api";

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIErrorResponse>) => {
    if (!error.response) {
      throw new NetworkError();
    }

    const { status, data } = error.response;
    const message = data?.message || "Erro desconhecido";
    const errorCode = data?.code || "UNKNOWN_ERROR";

    throw new APIError(message, status, errorCode, data?.details);
  },
);
