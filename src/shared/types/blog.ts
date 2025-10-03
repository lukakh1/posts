export type Blog = {
  id: number;
  title: string;
  sub_title?: string;
  body: string;
  created_at: Date;
  tags?: string[];
};

export type NewBlog = Omit<Blog, "id" | "created_at">;
