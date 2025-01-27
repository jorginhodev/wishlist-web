import { renderWithProviders, screen } from "@/tests/react-test-utils";
import userEvent from "@testing-library/user-event";
import { Header } from ".";

describe("<Header />", () => {
  it("should render logo with correct link", () => {
    renderWithProviders(<Header />);

    const logo = screen.getByRole("link", {
      name: "DEVSHOES - Ir para página inicial",
    });
    expect(logo).toHaveAttribute("href", "/");
  });

  it("should render wishlist link", () => {
    renderWithProviders(<Header />);

    const wishlistLink = screen.getByRole("link", {
      name: "Ver lista de desejos",
    });
    expect(wishlistLink).toHaveAttribute("href", "/wishlist");
  });

  it("should render user menu button", () => {
    renderWithProviders(<Header />);

    expect(
      screen.getByRole("button", { name: "Menu do usuário" }),
    ).toBeInTheDocument();
  });

  it("should show dropdown menu when user menu is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const menuButton = screen.getByRole("button", { name: "Menu do usuário" });
    await user.click(menuButton);

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(4);
    expect(menuItems[0]).toHaveTextContent("Entrar");
    expect(menuItems[1]).toHaveTextContent("Minha Conta");
    expect(menuItems[2]).toHaveTextContent("Endereços");
    expect(menuItems[3]).toHaveTextContent("Minha Netshoes");
  });

  it("should have correct aria labels", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Menu principal",
    );
  });

  it("should mark icons as decorative", () => {
    renderWithProviders(<Header />);

    const icons = document.querySelectorAll(".lucide");
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });
});
