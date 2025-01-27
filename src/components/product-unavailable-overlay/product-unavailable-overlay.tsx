import { memo } from "react";

export const ProductUnavailableOverlay = memo(
  function ProductUnavailableOverlay() {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50"
        role="status"
        aria-live="polite"
      >
        <span
          className="rounded-md bg-white/90 px-3 py-1 font-medium text-gray-500"
          aria-label="Este produto está indisponível no momento"
        >
          Produto Indisponível
        </span>
      </div>
    );
  },
);
