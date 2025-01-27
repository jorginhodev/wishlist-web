import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { OptimizedImage } from ".";

describe("<OptimizedImage />", () => {
  const defaultProps = {
    src: "/test-image.jpg",
    alt: "Test image",
  };

  it("should render image with correct props", () => {
    renderWithProviders(<OptimizedImage {...defaultProps} />);

    const image = screen.getByRole("img", { name: defaultProps.alt });
    expect(image).toHaveAttribute("src");
    expect(image).toHaveAttribute("alt", defaultProps.alt);
    expect(image).toHaveAttribute(
      "sizes",
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    );
  });

  it("should render with correct container styles", () => {
    renderWithProviders(<OptimizedImage {...defaultProps} />);

    const container = screen.getByRole("img", {
      name: defaultProps.alt,
    }).parentElement;
    expect(container).toHaveClass("relative", "h-full", "w-full");
  });

  it("should have correct layout styles", () => {
    renderWithProviders(<OptimizedImage {...defaultProps} />);

    const image = screen.getByRole("img", { name: defaultProps.alt });
    expect(image).toHaveStyle({
      position: "absolute",
      height: "100%",
      width: "100%",
    });
  });

  it("should not have priority loading", () => {
    renderWithProviders(<OptimizedImage {...defaultProps} />);

    const image = screen.getByRole("img", { name: defaultProps.alt });
    expect(image).not.toHaveAttribute("priority");
    expect(image).not.toHaveAttribute("loading", "eager");
  });
});
