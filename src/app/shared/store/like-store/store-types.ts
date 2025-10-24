// interface
export interface ILikeState {
  liked: number[];
}

export interface ILikeStore extends ILikeState {
  likePost: (post_id: number, type?: number) => void;
  unlikePost: (post_id: number, type?: number) => void;
  isLiked: (post_id: number) => boolean;
  handleLikeService: (value: Partial<ILikeState>) => void;
}
