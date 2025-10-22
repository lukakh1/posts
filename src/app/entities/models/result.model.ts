export type Result = {
  id: number;
  body: string;
};

export type NewResult = Omit<Result, "id">;
