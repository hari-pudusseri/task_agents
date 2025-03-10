
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) {
  const roundedRating = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating - fullStars >= 0.5;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };
  
  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              i < fullStars
                ? "text-amber-400 fill-amber-400"
                : i === fullStars && hasHalfStar
                ? "text-amber-400 fill-gradient-half"
                : "text-gray-300 fill-gray-100"
            )}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn("font-medium text-gray-800", textSizeClasses[size])}>
          {roundedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
