import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { APIError, NetworkError } from "@/lib/errors";

interface ErrorStateProps {
  error: unknown;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  let message = "Ocorreu um erro inesperado. Por favor, tente novamente.";

  if (error instanceof NetworkError) {
    message = "Erro de conexão. Por favor, verifique sua internet.";
  } else if (error instanceof APIError) {
    message = error.message;
  }

  return (
    <div
      className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 text-center"
      role="alert"
      aria-live="polite"
      data-testid="error-state"
    >
      <p className="text-gray-500" data-testid="error-message">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-2 gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          data-testid="retry-button"
          aria-label="Tentar carregar novamente"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
