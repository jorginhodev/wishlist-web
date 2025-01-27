"use client";

import { useGetProducts } from "@/hooks/use-product";
import { ErrorState } from "@/components/error-state";
import { Loader } from "@/components/loader";
import { ProductCard } from "@/components/product-card";
import { useWishlistActions } from "@/contexts/wishlist-context";
import { PageTitle } from "@/components/page-title";
import type { Product } from "@/types/product";

export default function Home() {
  const productsState = useGetProducts();
  const { isInWishlist } = useWishlistActions();

  if (productsState.status === "loading") {
    return (
      <div
        className="flex min-h-[400px] items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <Loader />
      </div>
    );
  }

  if (productsState.status === "error") {
    return (
      <ErrorState
        error={productsState.error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const products = productsState.data?.products ?? [];

  return (
    <main className="container mx-auto px-4 py-8">
      <PageTitle title="Home" />
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        role="region"
        aria-label="Lista de produtos"
      >
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard
              key={product.code}
              {...product}
              isWishlist={isInWishlist(product.code)}
            />
          ))
        ) : (
          <p
            className="col-span-full text-center text-gray-500"
            role="status"
            aria-live="polite"
          >
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </main>
  );
}
