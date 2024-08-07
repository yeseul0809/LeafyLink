import { create } from 'zustand';

interface BottomTabStore {
  showBottomTab: boolean;
  setShowBottomTab: (value: boolean) => void;
}
export const useBottomTabStore = create<BottomTabStore>((set) => ({
  showBottomTab: true,
  setShowBottomTab: (value: boolean) => set({ showBottomTab: value })
}));
