import { Request, Response } from "express";
import * as boardService from "../services/board-service";
import { NewBoard, Board } from "../types/board";
import { StatusCodes } from "http-status-codes";

export const createBoard = async (
  req: Request<Record<string, never>, never, NewBoard>,
  res: Response<Board>
): Promise<void> => {
  try {
    const board: NewBoard = req.body;
    const result: Board = await boardService.createBoard(board);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error(`Failed to create Board due to ${error}`);

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
