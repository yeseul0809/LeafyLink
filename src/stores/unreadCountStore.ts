import { create } from 'zustand';

interface CountStore {
  unreadCounts: { [key: string]: number };
  setUnreadCounts: (counts: { [key: string]: number }) => void;
}

export const unreadCountStore = create<CountStore>((set) => ({
  unreadCounts: {},
  setUnreadCounts: (counts) => set({ unreadCounts: counts })
}));
