"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type LikeStore, createLikeStore, initLikeStore } from "../store/index";

export type LikeStoreApi = ReturnType<typeof createLikeStore>;

export const LikeStoreContext = createContext<LikeStoreApi | undefined>(
  undefined
);

export interface LikeStoreProviderProps {
  children: ReactNode;
}

export const LikeStoreProvider = ({ children }: LikeStoreProviderProps) => {
  const storeRef = useRef<LikeStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createLikeStore(initLikeStore());
  }

  return (
    <LikeStoreContext.Provider value={storeRef.current}>
      {children}
    </LikeStoreContext.Provider>
  );
};

export const useLikeStore = <T,>(selector: (store: LikeStore) => T): T => {
  const likeStoreContext = useContext(LikeStoreContext);

  if (!likeStoreContext) {
    throw new Error(`useLikeStore must be used within LikeStoreProvider`);
  }

  return useStore(likeStoreContext, selector);
};
