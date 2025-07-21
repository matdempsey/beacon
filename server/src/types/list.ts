export type List = {
  id: number;
  name: string;
  boardId: number;
  createdAt: string;
  updatedAt: string;
};

export type NewList = Omit<List, "id" | "createdAt" | "updatedAt">;

export type ListRecord = {
  id: number;
  name: string;
  board_id: number;
  created_at: string;
  updated_at: string;
};
