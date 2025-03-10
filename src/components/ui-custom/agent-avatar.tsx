
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials, getRandomColor } from "@/lib/utils";
import { Agent, AgentStatus } from "@/lib/types";

interface AgentAvatarProps {
  name?: string;
  avatar?: string;
  status?: AgentStatus;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  agent?: Agent;
}

export function AgentAvatar({
  name,
  avatar,
  status,
  className,
  size = "md",
  showStatus = false,
  agent,
}: AgentAvatarProps) {
  // If an agent object is provided, use its properties
  const displayName = agent?.name || name || "";
  const displayAvatar = agent?.avatar || avatar;
  const displayStatus = agent?.status || status;
  
  const initials = getInitials(displayName);
  const fallbackColor = getRandomColor(displayName);
  
  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };
  
  const statusClasses = {
    [AgentStatus.AVAILABLE]: "bg-green-500",
    [AgentStatus.BUSY]: "bg-amber-500",
    [AgentStatus.OFFLINE]: "bg-gray-500",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className={cn("ring-2 ring-background", sizeClasses[size])}>
        <AvatarImage src={displayAvatar} alt={displayName} />
        <AvatarFallback 
          style={{ backgroundColor: fallbackColor }}
          className="text-white font-medium"
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && displayStatus && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background",
            statusClasses[displayStatus]
          )}
        />
      )}
    </div>
  );
}
