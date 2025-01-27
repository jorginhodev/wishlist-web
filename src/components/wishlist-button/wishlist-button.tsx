import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  isWishlist: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
  productName: string;
}

export function WishlistButton({
  isWishlist,
  onToggle,
  disabled,
  className,
  productName,
}: WishlistButtonProps) {
  const actionLabel = isWishlist
    ? `Remover ${productName} da lista de desejos`
    : `Adicionar ${productName} à lista de desejos`;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "absolute right-2 top-2 z-10 bg-white/80 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      aria-label={actionLabel}
      aria-pressed={isWishlist}
    >
      {isWishlist ? (
        <Heart
          className="h-5 w-5 fill-red-500 text-red-500"
          aria-hidden="true"
        />
      ) : (
        <Heart className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
