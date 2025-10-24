import { mixpanel } from "@/pkg/libraries/mixpanel";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ILikeState, ILikeStore } from "./store-types";

// service
export const useLikeStore = create<ILikeStore>()(
  persist(
    (set, get) => ({
      liked: [],
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
      handleLikeService: (value: Partial<ILikeState>) =>
        set((state) => ({ ...state, ...value })),
    }),
    { name: "likeStore" }
  )
);
