export type IqTest = {
  id: number;
  name: string;
  duration_min: number;
  questions_num: number;
  icon_name: string;
  is_available: boolean;
  sub_name: string;
};

export type NewIqTest = Omit<IqTest, "id">;
