import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("@t3-oss/env-nextjs", () => ({
  createEnv: () => ({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }),
}));

afterEach(() => {
  cleanup();
});

const originalConsoleError = console.error;
console.error = (...args) => {
  const errorMessage = args[0]?.toString() || "";

  if (
    errorMessage.includes("Warning: ReactDOM.render is no longer supported") ||
    errorMessage.includes("Warning: An update to") ||
    errorMessage.includes("ECONNREFUSED") ||
    errorMessage.includes("socket hang up") ||
    errorMessage.includes("AggregateError")
  ) {
    return;
  }

  originalConsoleError.call(console, ...args);
};

declare global {
  export const describe: (typeof import("vitest"))["describe"];
  export const it: (typeof import("vitest"))["it"];
  export const expect: (typeof import("vitest"))["expect"];
  export const beforeEach: (typeof import("vitest"))["beforeEach"];
  export const afterEach: (typeof import("vitest"))["afterEach"];
  export const vi: (typeof import("vitest"))["vi"];
}
