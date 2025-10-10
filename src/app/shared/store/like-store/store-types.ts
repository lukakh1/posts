export type LikeState = {
  liked: number[];
};

export type LikeActions = {
  likePost: (post_id: number, type?: number) => void;
  unlikePost: (post_id: number, type?: number) => void;
  isLiked: (post_id: number) => boolean;
};

export type LikeStore = LikeState & LikeActions;
