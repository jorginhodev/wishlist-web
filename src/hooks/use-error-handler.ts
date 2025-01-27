import { useCallback } from "react";
import { APIError, NetworkError, ValidationError } from "@/lib/errors";
import { toast } from "sonner";

interface ErrorMessages {
  [key: string]: string;
}

const API_ERROR_MESSAGES: ErrorMessages = {
  UNAUTHORIZED: "Você precisa estar logado para realizar esta ação",
  FORBIDDEN: "Você não tem permissão para realizar esta ação",
  NOT_FOUND: "O recurso solicitado não foi encontrado",
  INVALID_INPUT: "Dados inválidos. Por favor, verifique os campos",
};

export function useErrorHandler() {
  const handleError = useCallback((error: unknown) => {
    if (error instanceof NetworkError) {
      toast.error("Erro de conexão. Por favor, verifique sua internet.");
      return;
    }

    if (error instanceof ValidationError) {
      toast.error(error.message);
      return;
    }

    if (error instanceof APIError) {
      const message = API_ERROR_MESSAGES[error.code] || error.message;
      toast.error(message);

      console.error("[API Error]", {
        code: error.code,
        status: error.statusCode,
        message: error.message,
        details: error.details,
      });
      return;
    }

    console.error("[Unexpected Error]", error);
    toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
  }, []);

  return handleError;
}
