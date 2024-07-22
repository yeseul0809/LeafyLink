'use server';

import supabase from '../../../../supabase/supabaseClient';

export const getCartData = async () => {
  const { data, error } = await supabase.from('Cart').select();
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data;
};
