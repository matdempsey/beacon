import { Request, Response } from "express";
import * as listService from "../services/list-service";
import { NewList, List } from "../types/list";
import { StatusCodes } from "http-status-codes";

export const createList = async (
  req: Request<Record<string, never>, never, NewList>,
  res: Response<List>
): Promise<void> => {
  try {
    const list: NewList = req.body;
    const result: List = await listService.createList(list);

    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error(`Failed to create List due to ${error}`);

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
