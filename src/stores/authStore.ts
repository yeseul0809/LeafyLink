import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

// 로그인 했는지 안했는지 검사
export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  setIsLogin: (state: boolean) => set({ isLogin: state })
}));
