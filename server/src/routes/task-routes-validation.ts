import { z } from "zod";

export const createTaskInputSchema = z.strictObject({
  summary: z.string(),
  description: z.string(),
  priorityLevel: z.number(),
  position: z.number(),
  listId: z.number(),
});
