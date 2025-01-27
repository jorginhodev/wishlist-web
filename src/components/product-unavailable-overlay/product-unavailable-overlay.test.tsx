import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { ProductUnavailableOverlay } from ".";

describe("<ProductUnavailableOverlay />", () => {
  it("should render correctly", () => {
    renderWithProviders(<ProductUnavailableOverlay />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Produto Indisponível")).toBeInTheDocument();
  });

  it("should have correct aria attributes", () => {
    renderWithProviders(<ProductUnavailableOverlay />);

    const overlay = screen.getByRole("status");
    expect(overlay).toHaveAttribute("aria-live", "polite");
    expect(
      screen.getByLabelText("Este produto está indisponível no momento"),
    ).toBeInTheDocument();
  });

  it("should have correct styles", () => {
    renderWithProviders(<ProductUnavailableOverlay />);

    const overlay = screen.getByRole("status");
    expect(overlay).toHaveClass(
      "absolute inset-0 flex items-center justify-center bg-white bg-opacity-50",
    );

    const message = screen.getByText("Produto Indisponível");
    expect(message).toHaveClass(
      "rounded-md bg-white/90 px-3 py-1 font-medium text-gray-500",
    );
  });
});
