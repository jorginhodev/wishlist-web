import { renderWithProviders, screen } from "@/tests/react-test-utils";
import userEvent from "@testing-library/user-event";
import { ErrorState } from ".";
import { APIError, NetworkError } from "@/lib/errors";

describe("<ErrorState />", () => {
  it("should render default error message", () => {
    renderWithProviders(<ErrorState error={new Error()} />);

    expect(
      screen.getByText(
        "Ocorreu um erro inesperado. Por favor, tente novamente.",
      ),
    ).toBeInTheDocument();
  });

  it("should render network error message", () => {
    renderWithProviders(<ErrorState error={new NetworkError()} />);

    expect(
      screen.getByText("Erro de conexão. Por favor, verifique sua internet."),
    ).toBeInTheDocument();
  });

  it("should render API error message", () => {
    const errorMessage = "Erro na API";
    renderWithProviders(
      <ErrorState
        error={new APIError(errorMessage, 500, "Internal Server Error")}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorState error={new Error()} onRetry={onRetry} />);

    const button = screen.getByRole("button", {
      name: "Tentar carregar novamente",
    });
    expect(button).toBeInTheDocument();
  });

  it("should not render retry button when onRetry is not provided", () => {
    renderWithProviders(<ErrorState error={new Error()} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<ErrorState error={new Error()} onRetry={onRetry} />);

    const button = screen.getByRole("button", {
      name: "Tentar carregar novamente",
    });
    await user.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should have correct aria attributes", () => {
    renderWithProviders(<ErrorState error={new Error()} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "polite");
  });

  it("should render icon with correct attributes", () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorState error={new Error()} onRetry={onRetry} />);

    const icon = screen.getByTestId("retry-button").querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("h-4 w-4");
  });
});
