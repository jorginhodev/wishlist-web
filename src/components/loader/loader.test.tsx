import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { Loader } from ".";

describe("<Loader />", () => {
  it("should render correctly with default props", () => {
    renderWithProviders(<Loader />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should have correct aria attributes", () => {
    renderWithProviders(<Loader />);

    const loader = screen.getByRole("status");
    expect(loader).toHaveAttribute("aria-label", "Carregando conteúdo");
    expect(loader).toHaveAttribute("aria-live", "polite");
  });

  it("should apply different sizes correctly", () => {
    const { rerender } = renderWithProviders(<Loader size="sm" />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("h-4 w-4");

    rerender(<Loader size="md" />);
    expect(svg).toHaveClass("h-6 w-6");

    rerender(<Loader size="lg" />);
    expect(svg).toHaveClass("h-8 w-8");
  });

  it("should apply custom className when provided", () => {
    renderWithProviders(<Loader className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("should spread additional props to container", () => {
    renderWithProviders(<Loader data-testid="custom-loader" />);

    expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
  });
});
