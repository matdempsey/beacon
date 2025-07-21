import { Router } from "express";
import { validateRequest } from "../middleware/validate-request";
import { createBoardInputSchema } from "./board-routes-validation";
import * as boardController from "../controllers/board-controller";

const boardRouter = Router();

boardRouter.post(
  "/",
  validateRequest(createBoardInputSchema, "body"),
  boardController.createBoard
);
boardRouter.get("/", () => {});
boardRouter.get("/:boardId", () => {});
boardRouter.patch("/:boardId", () => {});
boardRouter.delete("/:boardId", () => {});

export default boardRouter;
