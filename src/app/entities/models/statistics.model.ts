export type Statistics = {
  id: number;
  name: string;
  flag_icon: string;
  iq: number;
};

export type NewStatistics = Omit<Statistics, "id">;
