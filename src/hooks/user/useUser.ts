import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { User } from '@/types/user';
import { getUserData } from '@/app/(providers)/(root)/(home)/actions';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
//
const useGetUser = () => {
  const queryClient = useQueryClient();
  const { isLogin } = useAuthStore();
  try {
    const {
      data: userData,
      error,
      isPending
    } = useQuery<User>({
      queryKey: ['user'],
      queryFn: () => getUserData(),
      staleTime: 1000 * 60 * 4,
      enabled: isLogin
    });
    if (error) {
      console.log('useGetUser tanstack error:', error);
    }

    return { userData, isPending };
  } catch (e) {
    return { userData: null };
  }
};

export default useGetUser;

// route handler사용 version
/*
import { QueryClient, useQuery } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { User } from '@/types/user';
import { getUserData } from '@/app/(providers)/(root)/(home)/actions';
//
const useGetUser = () => {
  const getUser = async () => {
    const response = await fetch('/api/auth/user'); 
    const data = await response.json();
    return data;
  };
  try {
    const {
      data: userData,
      error,
      isPending
    } = useQuery({
      queryKey: ['user'],
      queryFn: getUser,
      select: (data) => data?.userInfo,
      staleTime: 1000 * 60 * 3 // 1000은 1초 -> n분동안 다시 이걸 호출하면 갖고 있는거 줄게 (기본은 0) 근데 로그아웃 하면 날려야됨
    });
    if (error) {
      console.log('useGetUser tanstack error:', error);
    }
    console.log('tanstack result', userData);
    return { userData, isPending }; // 커스텀훅 return
    // 사용하는 곳에서 {userData} = useGetUser()  이런식으로 사용하면 됩니다!
  } catch (e) {
    return null;
  }
};

export default useGetUser;

*/
