export type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type WorkOrderPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type WorkOrder = {
  id: string;
  title: string;
  customerName: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTo?: string | null;
  createdAt?: unknown; // use Timestamp later if you want strict typing
  updatedAt?: unknown;
};
