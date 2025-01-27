import { APIError, NetworkError } from "@/lib/errors";

export type LoadingState = {
  status: "loading";
};

export type ErrorState = {
  status: "error";
  error: APIError | NetworkError;
};

export type SuccessState<T> = {
  status: "success";
  data: T;
};

export type ApiState<T> = LoadingState | ErrorState | SuccessState<T>;
