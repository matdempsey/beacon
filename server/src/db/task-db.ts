import * as db from "./db";
import { NewTask, TaskRecord } from "../types/task";

export const createTask = async (task: NewTask): Promise<TaskRecord> => {
  const { summary, description, priorityLevel, position, listId } = task;

  const queryText =
    "INSERT INTO tasks(summary, description, priority_level, position, list_id) VALUES($1, $2, $3, $4, $5) RETURNING *";
  const values = [summary, description, priorityLevel, position, listId];

  const result = await db.query(queryText, values);

  return result.rows[0];
};
