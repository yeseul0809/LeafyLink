'use server';

import { createClient } from '@/supabase/supabaseServer';
import { ProductInfo } from './_components/Payment';

export const getUserDate = async (userId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.from('User').select().eq('user_id', userId);
  return data;
};

export const updateStock = async (combinedData: ProductInfo) => {
  const supabaseServer = createClient();
  try {
    for (const product of combinedData.combinedData) {
      const { product_id, quantity } = product;

      const { data: currentProduct, error: fetchError } = await supabaseServer
        .from('Product')
        .select('stock')
        .eq('product_id', product_id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const newStock = currentProduct.stock - quantity;

      const { data, error } = await supabaseServer
        .from('Product')
        .update({ stock: newStock })
        .eq('product_id', product_id);

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};

export const updateUserData = async (
  userId: string,
  addressDetail: string,
  phoneNumber: string
) => {
  const supabaseServer = createClient();
  const { error } = await supabaseServer
    .from('User')
    .update({ address_detail: addressDetail, phone: phoneNumber })
    .eq('user_id', userId);
};
