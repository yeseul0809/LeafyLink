'use server';

import { createClient } from '@/supabase/supabaseServer';
import { CombinedProductData, ProductInfo } from './_components/Payment';

export const getUserDate = async (userId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.from('User').select().eq('user_id', userId);
  return data;
};

export const getOrderData = async (userId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.from('Order').select().eq('order_user_id', userId);
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

      console.log(`Stock updated for product_id ${product_id}: ${newStock}`);
    }

    console.log('Stock updated successfully');
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};
