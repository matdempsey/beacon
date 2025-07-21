export type Board = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NewBoard = Omit<Board, "id" | "createdAt" | "updatedAt">;

export type BoardRecord = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};
