import { z } from "zod";

export const createBoardInputSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
});
