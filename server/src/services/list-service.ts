import * as db from "../db/list-db";
import { List, NewList, ListRecord } from "../types/list";

const transformList = (list: ListRecord): List => ({
  id: list.id,
  name: list.name,
  boardId: list.board_id,
  createdAt: list.created_at,
  updatedAt: list.updated_at,
});

export const createList = async (list: NewList) => {
  const result: ListRecord = await db.createList(list);

  return transformList(result);
};
