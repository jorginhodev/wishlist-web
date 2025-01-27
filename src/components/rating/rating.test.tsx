import { renderWithProviders, screen } from "@/tests/react-test-utils";
import { Rating } from "./rating";

describe("<Rating />", () => {
  it("should render correct number of filled stars", () => {
    renderWithProviders(<Rating value={3} />);

    const filledStars = screen.getAllByTestId("star-filled");
    const emptyStars = screen.getAllByTestId("star-empty");

    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });

  it("should apply custom className when provided", () => {
    renderWithProviders(<Rating value={3} className="custom-class" />);

    const container = screen.getByRole("group", {
      name: "Avaliação 3 de 5 estrelas",
    });
    expect(container).toHaveClass("custom-class");
  });

  it("should have correct aria label", () => {
    renderWithProviders(<Rating value={3} />);

    expect(
      screen.getByRole("group", { name: "Avaliação 3 de 5 estrelas" }),
    ).toBeInTheDocument();
  });

  it("should render zero filled stars when value is 0", () => {
    renderWithProviders(<Rating value={0} />);

    const filledStars = screen.queryAllByTestId("star-filled");
    const emptyStars = screen.getAllByTestId("star-empty");

    expect(filledStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(5);
  });

  it("should render all filled stars when value is 5", () => {
    renderWithProviders(<Rating value={5} />);

    const filledStars = screen.getAllByTestId("star-filled");
    const emptyStars = screen.queryAllByTestId("star-empty");

    expect(filledStars).toHaveLength(5);
    expect(emptyStars).toHaveLength(0);
  });
});
