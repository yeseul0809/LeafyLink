'use server';

import {createClient} from '@/supabase/supabaseServer';
import { revalidatePath } from 'next/cache';

export const getUserSession = async() => {
  const supabaseSever = createClient()
  const {data,error} = await supabaseSever.auth.getUser()
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data
}

export const getCartData = async (userId:string) => {
  const supabaseSever = createClient()
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

export const getProductData = async (carts:CartProps[]) => {
  const supabaseSever = createClient()
  let productIds: string[] = carts.map(cart => cart.cart_product_id);
  let productCounts: number[] = carts.map(cart => cart.count);
  
  const {data,error} = await supabaseSever.from('Product').select().in("product_id",productIds)

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

    const response = data.map(product => {
      const index = productIds.indexOf(product.product_id);
      const count = productCounts[index];  
      return {
        ...product,
        count: count
      };
    });
  
    return response;  
}

export const deleteCart = async(productId:string) => {
  const supabaseSever = createClient()
  const {data,error} = await supabaseSever.from('Cart').delete().eq('cart_product_id',productId)
  if (error) {
    console.error('Error deleting record:', error);
    return;
  }
  revalidatePath('/cart')
  return data
}



