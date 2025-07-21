import { Router } from "express";
import { createTaskInputSchema } from "./task-routes-validation";
import { validateRequest } from "../middleware/validate-request";
import * as taskController from "../controllers/task-controller";

const taskRouter = Router();

taskRouter.post(
  "/",
  validateRequest(createTaskInputSchema, "body"),
  taskController.createTask
);
taskRouter.get("/", () => {});
taskRouter.get("/:taskId", () => {});
taskRouter.patch("/:taskId", () => {});
taskRouter.delete("/:taskId", () => {});

export default taskRouter;
