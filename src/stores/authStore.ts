'use client';
import { createClient } from '@/supabase/supabaseClient';
import { create } from 'zustand';
import { unreadCountStore } from './unreadCountStore';
import { useCartStore } from '.';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
  setLogout: () => void;
}

// 로그인 상태
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      // 초기값
      isLogin: false,
      setIsLogin: (state: boolean) => {
        set({ isLogin: state });
      },
      setLogout: async () => {
        try {
          const supabase = createClient();
          await supabase.auth.signOut();
          set({ isLogin: false });
          unreadCountStore.getState().setUnreadCounts({});
          useCartStore.setState({ cart: {} });
          localStorage.removeItem('user-storage');
        } catch (error) {
          console.error('로그아웃 실패', error);
        }
      }
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage
    }
  )
);

// export const useAuthStore = create(
//   persist<AuthState>(
//     (set) => ({
//       // 초기값
//       getUser: async () => {
//   const supabase = createClient();
//   const { data } = await supabase.auth.getUser();
//   return data.user;
// },
//       setLogout: async () => {
//         try {
//           const supabase = createClient();
//           await supabase.auth.signOut();
//           set({ isLogin: false });
//           unreadCountStore.getState().setUnreadCounts({});
//           useCartStore.setState({ cart: {} });
//           localStorage.removeItem('user-storage');
//         } catch (error) {
//           console.error('로그아웃 실패', error);
//         }
//       }
//     }),
//     {
//       name: 'user-storage',
//       getStorage: () => localStorage
//     }
//   )
// );
