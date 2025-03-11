export interface ProcurementAgent {
  id: string;
  name: string;
  description: string;
  status: string;
  avatar: string;
  rating: number;
  tasksCompleted: number;
  skills: { id: number; name: string; }[];
}

export const procurementAgents: ProcurementAgent[] = [
  {
    id: 'p1',
    name: "Supplier Onboarding Agent",
    description: "Automates supplier onboarding process and verification",
    status: "available",
    avatar: "/agents/onboarding.png",
    rating: 4.5,
    tasksCompleted: 128,
    skills: [
      { id: 1, name: "Supplier Verification" },
      { id: 2, name: "Document Processing" },
      { id: 3, name: "Risk Assessment" }
    ]
  },
  {
    id: 'p2',
    name: "Contract Management Agent",
    description: "Handles contract creation, review, and renewal processes",
    status: "available",
    avatar: "/agents/contract.png",
    rating: 4.8,
    tasksCompleted: 256,
    skills: [
      { id: 4, name: "Contract Review" },
      { id: 5, name: "Legal Compliance" },
      { id: 6, name: "Renewal Management" }
    ]
  },
  {
    id: 'p3',
    name: "Guided Buying Agent",
    description: "Assists in purchase decisions and supplier selection",
    status: "available",
    avatar: "/agents/buying.png",
    rating: 4.6,
    tasksCompleted: 192,
    skills: [
      { id: 7, name: "Supplier Selection" },
      { id: 8, name: "Price Comparison" },
      { id: 9, name: "Purchase Optimization" }
    ]
  }
]; 