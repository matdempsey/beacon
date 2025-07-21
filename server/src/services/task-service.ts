import * as db from "../db/task-db";
import { NewTask, Task, TaskRecord } from "../types/task";

const transformTask = (task: TaskRecord): Task => ({
  id: task.id,
  summary: task.summary,
  description: task.description,
  position: task.position,
  priorityLevel: task.priority_level,
  listId: task.list_id,
  createdAt: task.created_at,
  updatedAt: task.updated_at,
});

export const createTask = async (task: NewTask) => {
  const result: TaskRecord = await db.createTask(task);

  return transformTask(result);
};
