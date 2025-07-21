import { z } from "zod";

export const createListInputSchema = z.strictObject({
  name: z.string(),
  boardId: z.number(),
});
