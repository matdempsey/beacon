export type Task = {
  id: number;
  summary: string;
  description: string;
  priorityLevel: number;
  position: number;
  listId: number;
  createdAt: string;
  updatedAt: string;
};

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type TaskRecord = {
  id: number;
  summary: string;
  description: string;
  position: number;
  priority_level: number;
  list_id: number;
  created_at: string;
  updated_at: string;
};
