import { z } from "zod";

export const createTaskInputSchema = z.strictObject({
  summary: z.string().min(1).max(255),
  description: z.string(),
  priorityLevel: z.number().min(1).max(4),
  position: z.number().nonnegative(),
  listId: z.number(),
});
