import { renderWithProviders, screen } from "@/tests/react-test-utils";
import userEvent from "@testing-library/user-event";
import { WishlistButton } from ".";

describe("<WishlistButton />", () => {
  const defaultProps = {
    isWishlist: false,
    onToggle: vi.fn(),
    productName: "Tênis Test",
  };

  it("should render in default state", () => {
    renderWithProviders(<WishlistButton {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: "Adicionar Tênis Test à lista de desejos",
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass("cursor-not-allowed");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("should render in wishlist state", () => {
    renderWithProviders(<WishlistButton {...defaultProps} isWishlist={true} />);

    const button = screen.getByRole("button", {
      name: "Remover Tênis Test da lista de desejos",
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("should call onToggle when clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <WishlistButton {...defaultProps} onToggle={onToggle} />,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    renderWithProviders(<WishlistButton {...defaultProps} disabled />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("should apply custom className when provided", () => {
    renderWithProviders(
      <WishlistButton {...defaultProps} className="custom-class" />,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
