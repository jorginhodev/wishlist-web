"use client";

import { memo } from "react";
import { OptimizedImage } from "@/components/optimized-image";
import { WishlistButton } from "@/components/wishlist-button";
import { PriceDisplay } from "@/components/price-display";
import { Rating } from "@/components/rating";
import { ProductCardProps } from "@/types/product-card";
import { useWishlistActions } from "@/contexts/wishlist-context";
import { ProductUnavailableOverlay } from "@/components/product-unavailable-overlay";

export const ProductCard = memo(function ProductCard({
  code,
  name,
  image,
  fullPriceInCents,
  salePriceInCents,
  rating,
  available,
  stockAvailable,
  isWishlist,
}: ProductCardProps) {
  const disabled = !available || !stockAvailable;
  const { toggleWishlist } = useWishlistActions();

  return (
    <article
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:shadow-md"
      data-testid={`product-card-${code}`}
      aria-labelledby={`product-name-${code}`}
      tabIndex={0}
    >
      <div className="relative aspect-square" aria-hidden={disabled}>
        <WishlistButton
          isWishlist={isWishlist}
          onToggle={() => toggleWishlist(code)}
          disabled={disabled}
          productName={name}
          data-testid={`wishlist-button-${code}`}
        />
        <OptimizedImage
          src={image || "/placeholder.svg"}
          alt={`Imagem do produto ${name}`}
          data-testid={`product-image-${code}`}
        />
      </div>

      <div className="p-4">
        <h3
          id={`product-name-${code}`}
          className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium"
          data-testid={`product-name-${code}`}
        >
          {name}
        </h3>

        <Rating
          value={rating}
          className="mb-2"
          data-testid={`product-rating-${code}`}
          aria-label={`Avaliação ${rating} de 5 estrelas`}
        />

        <PriceDisplay
          fullPrice={fullPriceInCents}
          salePrice={salePriceInCents}
          data-testid={`product-price-${code}`}
          aria-label={
            salePriceInCents
              ? `Preço original ${fullPriceInCents}, em promoção por ${salePriceInCents}`
              : `Preço ${fullPriceInCents}`
          }
        />
      </div>

      {disabled && (
        <ProductUnavailableOverlay
          data-testid={`product-overlay-${code}`}
          aria-label="Produto indisponível"
        />
      )}
    </article>
  );
});
