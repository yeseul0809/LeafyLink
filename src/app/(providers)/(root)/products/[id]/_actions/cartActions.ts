import { createClient } from '@/supabase/supabaseClient';
import { CartItemInput } from '@/types/cart';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export async function createCartItem(cartItemData: CartItemInput, userId: string) {
  const supabase: SupabaseClient<Database> = createClient();

  const { data: cartData, error: cartError } = await supabase
    .from('Cart')
    .select()
    .eq('cart_user_id', userId)
    .eq('cart_product_id', cartItemData.cart_product_id);

  if (cartData!.length !== 0) {
    const newCount = cartData![0].count + 1;
    const { data, error } = await supabase
      .from('Cart')
      .update({
        cart_product_id: cartItemData.cart_product_id,
        count: newCount,
        cart_user_id: userId,
        is_checked: false
      })
      .eq('cart_user_id', userId)
      .eq('cart_product_id', cartItemData.cart_product_id);

    if (error) {
      console.error('장바구니 데이터 삽입 중 에러발생', error);
      return;
    }
    const result = 'update complete';
    return result;
  } else {
    const { data, error } = await supabase.from('Cart').insert([cartItemData]).select('*');

    if (error) {
      console.error('장바구니 데이터 삽입 중 에러발생', error);
      return;
    }
    return data;
  }
}
