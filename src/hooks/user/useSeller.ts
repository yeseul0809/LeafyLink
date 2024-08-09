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

  return { sellerData, error, isPending };
};

export default useGetSeller;
