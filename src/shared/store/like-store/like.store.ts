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
        likePost: (post_id) => {
          mixpanel.track("Post Liked", {
            post_id,
            timestamp: new Date().toISOString(),
          });
          const currentlyLiked = get().liked.includes(post_id);
          if (currentlyLiked) return;
          set((state) => ({ liked: [...state.liked, post_id] }));
        },
        unlikePost: (post_id) => {
          const currentlyLiked = get().liked.includes(post_id);
          if (!currentlyLiked) return;

          mixpanel.track("Post unLiked", {
            post_id,
            timestamp: new Date().toISOString(),
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
