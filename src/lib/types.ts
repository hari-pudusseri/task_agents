export enum AgentStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  OFFLINE = "offline"
}

export enum TaskStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in-progress",
  WAITING = "waiting",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum TaskPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

export interface Skill {
  id: number;
  name: string;
  description: string;
}

export interface Agent {
  id: number;
  name: string;
  avatar: string;
  description: string;
  skills: Skill[];
  rating: number;
  status: AgentStatus;
  tasksCompleted: number;
  createdAt: string;
  community: {
    usage: number;
    rating: number;
  };
}

export interface Message {
  id: number;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export interface ProgressUpdate {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  agent: Agent;
  assignedAt: string;
  dueDate?: string;
  scheduledFor?: string;
  completedAt?: string;
  progress: number;
  messages: Message[];
  progressUpdates: ProgressUpdate[];
}
