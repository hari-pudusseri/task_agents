
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive";
}

export function SkillBadge({ 
  name, 
  className,
  variant = "secondary" 
}: SkillBadgeProps) {
  return (
    <Badge 
      variant={variant} 
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        className
      )}
    >
      {name}
    </Badge>
  );
}
