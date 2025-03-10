
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy");
}

// Format date to readable string with time
export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "MMM d, yyyy h:mm a");
}

// Format time from date
export function formatTime(date: string | Date): string {
  return format(new Date(date), "h:mm a");
}

// Format date to relative time (e.g. "2 hours ago")
export function formatRelativeTime(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

// Random color generator for avatar backgrounds
export function getRandomColor(seed: string): string {
  // Generate a color based on string hash
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
}

// Task priority text and color
export function getPriorityDetails(priority: string): { label: string; color: string } {
  switch (priority) {
    case 'high':
      return { label: 'High', color: 'text-red-500 bg-red-50' };
    case 'medium':
      return { label: 'Medium', color: 'text-amber-500 bg-amber-50' };
    case 'low':
      return { label: 'Low', color: 'text-green-500 bg-green-50' };
    default:
      return { label: 'Normal', color: 'text-blue-500 bg-blue-50' };
  }
}

// Task status text and color
export function getStatusDetails(status: string): { label: string; color: string; bgColor: string } {
  switch (status) {
    case 'scheduled':
      return { 
        label: 'Scheduled', 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-100' 
      };
    case 'in-progress':
      return { 
        label: 'In Progress', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100' 
      };
    case 'waiting':
      return { 
        label: 'Waiting', 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-100' 
      };
    case 'completed':
      return { 
        label: 'Completed', 
        color: 'text-green-600', 
        bgColor: 'bg-green-100' 
      };
    case 'cancelled':
      return { 
        label: 'Cancelled', 
        color: 'text-red-600', 
        bgColor: 'bg-red-100' 
      };
    default:
      return { 
        label: 'Unknown', 
        color: 'text-gray-600', 
        bgColor: 'bg-gray-100' 
      };
  }
}

// Agent status text and color
export function getAgentStatusDetails(status: string): { label: string; color: string; bgColor: string } {
  switch (status) {
    case 'available':
      return { 
        label: 'Available', 
        color: 'text-green-600', 
        bgColor: 'bg-green-100' 
      };
    case 'busy':
      return { 
        label: 'Busy', 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-100' 
      };
    case 'offline':
      return { 
        label: 'Offline', 
        color: 'text-gray-600', 
        bgColor: 'bg-gray-100' 
      };
    default:
      return { 
        label: 'Unknown', 
        color: 'text-gray-600', 
        bgColor: 'bg-gray-100' 
      };
  }
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
