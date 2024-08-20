'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { getUserData } from '@/app/(providers)/(root)/(home)/actions';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
const useGetUser = () => {
  const queryClient = useQueryClient();
  const { isLogin } = useAuthStore();
  const {
    data: userData,
    error,
    refetch,
    isPending
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => getUserData()
    // enabled: isLogin
  });
  if (error) {
    console.log('useGetUser tanstack error:', error);
  }

  return { userData, isPending };
};

export default useGetUser;
