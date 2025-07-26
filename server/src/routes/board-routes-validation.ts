import { z } from "zod";

export const createBoardInputSchema = z.strictObject({
  name: z.string().min(1).max(100),
  description: z.string(),
});
