import { z } from "zod";

export const createListInputSchema = z.strictObject({
  name: z.string().min(1).max(100),
  boardId: z.number(),
});
