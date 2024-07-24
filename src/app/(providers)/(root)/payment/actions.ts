'use server';

import supabaseSever from '@/supabase/supabaseServer';

export const getUserDate = async (userId:string) => {
  const{data,error} = await supabaseSever.from('User').select().eq('user_id',userId);
  return data
};

export const getOrderData = async (userId:string) => {
  const {data,error} = await supabaseSever.from('Order').select().eq('order_user_id',userId)
}

