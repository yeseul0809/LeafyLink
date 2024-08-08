'use client';
import { createClient } from '@/supabase/supabaseClient';
import { create } from 'zustand';

interface AuthState {
  isLogin: boolean;
  isSeller: boolean;
  setIsLogin: (state: boolean) => void;
  setLogout: (state: boolean) => void;
}

// 로그인 상태
export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  isSeller: false,
  setIsSeller: (state: boolean) => {
    set({ isLogin: state });
  },
  setIsLogin: async (state: boolean) => {
    set({ isLogin: state });
  },
  setLogout: async (state: boolean) => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      set({ isLogin: false });
      // window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  }
}));
