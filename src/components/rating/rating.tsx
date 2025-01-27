import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className }: RatingProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={`Avaliação ${value} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          data-testid={index < value ? "star-filled" : "star-empty"}
          className={cn(
            "h-4 w-4",
            index < value
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
