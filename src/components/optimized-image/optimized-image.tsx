import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
}: OptimizedImageProps) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover object-center", className)}
        priority={false}
      />
    </div>
  );
});
