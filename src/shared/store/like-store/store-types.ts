export type LikeState = {
  liked: number[];
};

export type LikeActions = {
  likePost: (post_id: number) => void;
  unlikePost: (post_id: number) => void;
  isLiked: (post_id: number) => boolean;
};

export type LikeStore = LikeState & LikeActions;
