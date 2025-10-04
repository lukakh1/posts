import { mixpanel } from "@/shared/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LikeState, LikeStore } from "./store-types";

export const initLikeStore = (): LikeState => {
  return { liked: [] };
};

export const defaultInitState: LikeState = {
  liked: [],
};

export const createLikeStore = (initState: LikeState = defaultInitState) => {
  return create<LikeStore>()(
    persist(
      (set, get) => ({
        ...initState,
        likePost: (post_id, type = 0) => {
          mixpanel.track("Post Liked", {
            post_id,
            card_type: type,
          });
          const currentlyLiked = get().liked.includes(post_id);
          if (currentlyLiked) return;
          set((state) => ({ liked: [...state.liked, post_id] }));
        },
        unlikePost: (post_id, type = 0) => {
          const currentlyLiked = get().liked.includes(post_id);
          if (!currentlyLiked) return;

          mixpanel.track("Post unLiked", {
            post_id,
            card_type: type,
          });

          set((state) => ({
            liked: state.liked.filter((id) => id !== post_id),
          }));
        },
        isLiked: (post_id) => {
          const result = get().liked.includes(post_id);
          return result;
        },
      }),
      { name: "likeStore" }
    )
  );
};
