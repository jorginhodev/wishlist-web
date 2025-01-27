import { formatPrice } from "@/lib/format-price";

interface PriceDisplayProps {
  fullPrice: string;
  salePrice?: string;
  className?: string;
}

export function PriceDisplay({
  fullPrice,
  salePrice,
  className,
}: PriceDisplayProps) {
  const formattedFullPrice = formatPrice(fullPrice);
  const formattedSalePrice = salePrice ? formatPrice(salePrice) : null;

  return (
    <div className={className} role="group" aria-label="Informações de preço">
      {formattedSalePrice ? (
        <>
          <span
            className="block text-xs text-gray-500 line-through"
            aria-label="Preço original"
          >
            De: {formattedFullPrice}
          </span>
          <span
            className="text-base font-medium text-green-600"
            aria-label="Preço promocional"
          >
            Por: {formattedSalePrice}
          </span>
        </>
      ) : (
        <span
          className="text-base font-medium text-gray-900"
          aria-label="Preço"
        >
          {formattedFullPrice}
        </span>
      )}
    </div>
  );
}
