import { Router } from "express";
import { validateRequest } from "../middleware/validate-request";
import { createListInputSchema } from "./list-routes-validation";
import * as listController from "../controllers/list-controller";

const listRouter = Router();

listRouter.post(
  "/",
  validateRequest(createListInputSchema, "body"),
  listController.createList
);
listRouter.get("/", () => {});
listRouter.get("/:listId", () => {});
listRouter.patch("/:listId", () => {});
listRouter.delete("/:listId", () => {});

export default listRouter;
