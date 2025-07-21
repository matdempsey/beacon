import * as db from "./db";
import { ListRecord, NewList } from "../types/list";

export const createList = async (list: NewList): Promise<ListRecord> => {
  const { name, boardId } = list;

  const queryText =
    "INSERT INTO lists(name, board_id) VALUES($1, $2) RETURNING *";
  const values = [name, boardId];

  const result = await db.query(queryText, values);

  return result.rows[0];
};
