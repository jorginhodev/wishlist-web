"use client";

import { useGetProducts } from "@/hooks/use-product";
import { ErrorState } from "@/components/error-state";
import { Loader } from "@/components/loader";
import { ProductCard } from "@/components/product-card";
import { useWishlist } from "@/contexts/wishlist-context";
import { PageTitle } from "@/components/page-title";
import type { Product } from "@/types/product";

export default function WishlistPage() {
  const { wishlist, isLoading: isWishlistLoading } = useWishlist();
  const productsState = useGetProducts();

  if (productsState.status === "loading" || isWishlistLoading) {
    return (
      <div className="min-h-screen bg-gray-50" role="status" aria-live="polite">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (productsState.status === "error") {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorState
          error={productsState.error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const products = productsState.data?.products ?? [];
  const wishlistProducts = products.filter((product) =>
    wishlist.some((item) => item.productCode === product.code),
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageTitle
          title="Wishlist"
          backTo={{
            label: "Home",
            href: "/",
          }}
        />
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="region"
          aria-label="Lista de produtos favoritos"
        >
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product: Product) => (
              <ProductCard key={product.code} {...product} isWishlist={true} />
            ))
          ) : (
            <p
              className="col-span-full text-center text-gray-500"
              role="status"
              aria-live="polite"
            >
              Sua lista de desejos está vazia
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
