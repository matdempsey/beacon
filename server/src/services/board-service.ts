import * as db from "../db/board-db";
import { Board, BoardRecord, NewBoard } from "../types/board";

const transformBoard = (board: BoardRecord): Board => ({
  id: board.id,
  name: board.name,
  description: board.description,
  createdAt: board.created_at,
  updatedAt: board.updated_at,
});

export const createBoard = async (board: NewBoard) => {
  const result: BoardRecord = await db.createBoard(board);

  return transformBoard(result);
};
