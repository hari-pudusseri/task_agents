
import { Badge } from "@/components/ui/badge";
import { cn, getAgentStatusDetails, getStatusDetails } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type: "agent" | "task";
  className?: string;
}

export function StatusBadge({ 
  status, 
  type,
  className 
}: StatusBadgeProps) {
  const details = type === "agent" 
    ? getAgentStatusDetails(status) 
    : getStatusDetails(status);
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "font-medium rounded-full border-0",
        details.bgColor,
        details.color,
        className
      )}
    >
      {details.label}
    </Badge>
  );
}
