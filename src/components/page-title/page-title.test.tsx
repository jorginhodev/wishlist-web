import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { PageTitle } from ".";

describe("<PageTitle />", () => {
  it("should render title correctly", () => {
    renderWithProviders(<PageTitle title="Produtos" />);

    const title = screen.getByText("Produtos");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("aria-current", "page");
  });

  it("should render back link when backTo is provided", () => {
    renderWithProviders(
      <PageTitle
        title="Wishlist"
        backTo={{
          label: "Home",
          href: "/",
        }}
      />,
    );

    const backLink = screen.getByRole("link", { name: "Voltar para Home" });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("should not render back link when backTo is not provided", () => {
    renderWithProviders(<PageTitle title="Home" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should have correct aria labels", () => {
    renderWithProviders(
      <PageTitle
        title="Wishlist"
        backTo={{
          label: "Home",
          href: "/",
        }}
      />,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Breadcrumb",
    );
    expect(screen.getByText("Wishlist")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should render divider with correct role", () => {
    renderWithProviders(
      <PageTitle
        title="Wishlist"
        backTo={{
          label: "Home",
          href: "/",
        }}
      />,
    );

    expect(screen.getByRole("presentation")).toHaveClass(
      "mb-6 h-px bg-gray-200",
    );
  });
});
