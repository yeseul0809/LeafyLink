'use server';

import supabaseSever from '@/supabase/supabaseServer';

export const getUserSession = async() => {
  const {data,error} = await supabaseSever.auth.getUser()
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data
}

export const getCartData = async (userId:string) => {
  const { data, error } = await supabaseSever.from('Cart').select().eq('cart_user_id',userId);
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data;
};

interface CartProps {
  cart_id: string,
  cart_product_id: string,
  count: number,
  cart_user_id: string
}

export const getProductData = async (products:CartProps[]) => {
  let productIds: string[] = products.map(product => product.cart_product_id);
  const {data,error} = await supabaseSever.from('Product').select().in("product_id",productIds)

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data;
}

