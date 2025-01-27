import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("should format integer price correctly", () => {
    expect(formatPrice("10000")).toBe("R$ 100,00");
  });

  it("should format decimal price correctly", () => {
    expect(formatPrice("10099")).toBe("R$ 100,99");
  });

  it("should format price with leading zeros", () => {
    expect(formatPrice("099")).toBe("R$ 0,99");
  });

  it("should format single digit price", () => {
    expect(formatPrice("1")).toBe("R$ 0,01");
  });

  it("should format large numbers", () => {
    expect(formatPrice("1000000")).toBe("R$ 10.000,00");
  });

  it("should handle empty string", () => {
    expect(formatPrice("")).toBe("R$ 0,00");
  });

  it("should handle invalid input", () => {
    expect(formatPrice("abc")).toBe("R$ 0,00");
  });
});
