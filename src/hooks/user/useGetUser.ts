import { QueryClient, useQuery } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { User } from '@/types/user';
//
const useGetUser = () => {
  const supabase = createClient();

  const getUser = async () => {
    const data = await supabase.auth.getUser();
    if (data) {
      const userId = data.data.user?.id;
      try {
        const { data: userData, error } = await supabase
          .from('User')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (error) {
          throw error;
        }
        return userData;
      } catch (error) {
        throw error;
      }
    }
  };

  try {
    const {
      data: userData,
      error,
      isPending
    } = useQuery<User>({
      queryKey: ['user'],
      queryFn: getUser,
      staleTime: 1000 * 60 // 1000은 1초 -> n분동안 다시 이걸 호출하면 갖고 있는거 줄게 (기본은 0) 근데 로그아웃 하면 날려야됨
    });
    if (error) {
      console.log('tanstack error : getUser =>', error);
    }

    return { userData, isPending }; // 커스텀훅 return
    // 사용하는 곳에서 {userData} = useGetUser()
    // 이런식으로 사용하면 됩니다!
  } catch (e) {
    return null;
  }
};

export default useGetUser;
