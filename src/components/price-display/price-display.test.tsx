import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { PriceDisplay } from ".";

describe("<PriceDisplay />", () => {
  it("should render full price correctly", () => {
    renderWithProviders(<PriceDisplay fullPrice="9990" />);

    expect(
      screen.getByRole("group", { name: /informações de preço/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
  });

  it("should render sale price when provided", () => {
    renderWithProviders(<PriceDisplay fullPrice="9990" salePrice="7990" />);

    const originalPrice = screen.getByText(/R\$ 99,90/);
    const salePrice = screen.getByText(/R\$ 79,90/);

    expect(originalPrice).toHaveClass("line-through");
    expect(salePrice).toHaveClass("text-green-600");
  });

  it("should apply custom className when provided", () => {
    renderWithProviders(
      <PriceDisplay fullPrice="9990" className="custom-class" />,
    );

    expect(screen.getByRole("group")).toHaveClass("custom-class");
  });

  it("should have correct aria labels", () => {
    renderWithProviders(<PriceDisplay fullPrice="9990" salePrice="7990" />);

    expect(screen.getByLabelText(/preço original/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço promocional/i)).toBeInTheDocument();
  });
});
