import { Request, Response } from "express";
import * as taskService from "../services/task-service";
import { NewTask, Task } from "../types/task";
import { StatusCodes } from "http-status-codes";

export const createTask = async (
  req: Request<Record<string, never>, never, NewTask>,
  res: Response<Task>
): Promise<void> => {
  try {
    const task: NewTask = req.body;
    const result: Task = await taskService.createTask(task);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error(`Failed to create Task due to ${error}`);

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
