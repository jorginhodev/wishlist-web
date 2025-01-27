import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from ".";
import { renderWithProviders } from "@/tests/react-test-utils";

const mockProduct = {
  code: "TENIS-001",
  name: "Tênis Nike Test",
  image: "/images/tenis-test.jpg",
  fullPriceInCents: "29990",
  salePriceInCents: "19990",
  rating: 4,
  available: true,
  stockAvailable: true,
  isWishlist: false,
  visible: true,
  details: {
    name: "Tênis Nike Test",
    description: "Tênis para corrida com tecnologia de amortecimento",
  },
};

describe("<ProductCard />", () => {
  it("should render product information correctly", () => {
    renderWithProviders(<ProductCard {...mockProduct} />);

    expect(
      screen.getByTestId(`product-card-${mockProduct.code}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`product-name-${mockProduct.code}`),
    ).toHaveTextContent(mockProduct.name);
    expect(
      screen.getByAltText(`Imagem do produto ${mockProduct.name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Informações de preço" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /avaliação/i }),
    ).toBeInTheDocument();
  });

  it("should show unavailable overlay when product is not available", () => {
    const unavailableProduct = { ...mockProduct, available: false };
    renderWithProviders(<ProductCard {...unavailableProduct} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Produto Indisponível")).toBeInTheDocument();
  });

  it("should show unavailable overlay when stock is not available", () => {
    const noStockProduct = { ...mockProduct, stockAvailable: false };
    renderWithProviders(<ProductCard {...noStockProduct} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Produto Indisponível")).toBeInTheDocument();
  });

  it("should disable wishlist button when product is unavailable", () => {
    const unavailableProduct = { ...mockProduct, available: false };
    renderWithProviders(<ProductCard {...unavailableProduct} />);

    const wishlistButton = screen.getByLabelText(
      `Adicionar ${mockProduct.name} à lista de desejos`,
    );
    expect(wishlistButton).toBeDisabled();
  });

  it("should toggle wishlist when button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard {...mockProduct} />);

    const wishlistButton = screen.getByLabelText(
      `Adicionar ${mockProduct.name} à lista de desejos`,
    );
    expect(wishlistButton).toBeInTheDocument();
    await user.click(wishlistButton);
  });

  it("should have correct aria attributes", () => {
    renderWithProviders(<ProductCard {...mockProduct} />);

    const card = screen.getByTestId(`product-card-${mockProduct.code}`);
    expect(card).toHaveAttribute(
      "aria-labelledby",
      `product-name-${mockProduct.code}`,
    );

    const image = screen.getByAltText(`Imagem do produto ${mockProduct.name}`);
    expect(image).toBeInTheDocument();

    const rating = screen.getByRole("group", { name: /avaliação/i });
    expect(rating).toHaveAttribute("aria-label", "Avaliação 4 de 5 estrelas");
  });

  it("should use placeholder image when no image is provided", () => {
    const productWithoutImage = { ...mockProduct, image: undefined };
    renderWithProviders(<ProductCard {...productWithoutImage} />);

    const image = screen.getByAltText(`Imagem do produto ${mockProduct.name}`);
    expect(image).toHaveAttribute("src", "/placeholder.svg");
  });
});
