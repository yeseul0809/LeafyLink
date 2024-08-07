import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { Seller } from '@/types/seller';
import { useState, useEffect } from 'react';

// 샐러인지 아닌지 검사
const useGetSeller = (userId: string) => {
  const supabase = createClient();
  const getSeller = async () => {
    // const { data } = await supabase.auth.getUser();
    // const userId = data?.user?.id;

    if (userId) {
      try {
        const { data, error } = await supabase
          .from('Seller')
          .select('*')
          .eq('seller_id', userId)
          .maybeSingle();
        if (error) {
          console.log('getSeller supabase Error:', error);
          throw error;
        }
        return data;
      } catch (error) {
        console.log('getSeller supabase Error catch:', error);
        throw error;
      }
    } else {
      throw error;
    }
  };
  // 탠스택 쿼리 자체가 쓸 때 useState를 안써용
  const {
    data: sellerData,
    error,
    isPending
  } = useQuery<Seller>({
    queryKey: ['seller'],
    queryFn: getSeller,
    enabled: !!userId
  });
  if (error) {
    console.log('tanstack error : seller =>', error);
  }
  // console.log('sellerData tanstack =>', sellerData);

  // 해결 됐습니다! useGetSeller함수에 async가 붙어 있었어요🤦‍♂️

  return { sellerData, error, isPending };
};

export default useGetSeller;
