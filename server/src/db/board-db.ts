import * as db from "./db";
import { BoardRecord, NewBoard } from "../types/board";

export const createBoard = async (board: NewBoard): Promise<BoardRecord> => {
  const { name, description } = board;

  const queryText =
    "INSERT INTO boards(name, description) VALUES($1, $2) RETURNING *";
  const values = [name, description];

  const result = await db.query(queryText, values);

  return result.rows[0];
};
