'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/supabase/supabaseServer';

export const getUserSession = async () => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.auth.getUser();
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data;
};

export interface Product {
  product_id: string;
  category: string;
  title: string;
  price: number;
  thumbnail_url: string;
  description: string;
  stock: number;
  created_at: string;
  updated_at: string;
  product_seller_id: string;
  count: number;
}

export const getCartData = async (userId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.from('Cart').select().eq('cart_user_id', userId);
  if (error) {
    console.error('Error fetching posts:', error);
  }
  return data;
};

interface CartProps {
  cart_id: string;
  cart_product_id: string;
  count: number;
  cart_user_id: string;
  is_checked: boolean;
}

export const getProductData = async (carts: CartProps[], type: string): Promise<Product[]> => {
  const supabaseSever = createClient();
  let response;
  if (type === 'all') {
    let productIds: string[] = carts.map((cart) => cart.cart_product_id);
    let productCounts: number[] = carts.map((cart) => cart.count);

    const { data, error } = await supabaseSever
      .from('Product')
      .select()
      .in('product_id', productIds);

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    const result = data.map((product) => {
      const index = productIds.indexOf(product.product_id);
      const count = productCounts[index];
      return {
        ...product,
        count: count
      };
    });

    response = result;
  } else if (type === 'checked') {
    let filteredCarts = carts.filter((cart) => cart.is_checked);
    let productIds: string[] = filteredCarts.map((cart) => cart.cart_product_id);
    let productCounts: number[] = filteredCarts.map((cart) => cart.count);

    const { data, error } = await supabaseSever
      .from('Product')
      .select()
      .in('product_id', productIds);

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    const result = data.map((product) => {
      const index = productIds.indexOf(product.product_id);
      const count = productCounts[index];
      return {
        ...product,
        count: count
      };
    });

    response = result;
  }

  return response as Product[];
};

export const deleteCart = async (productId: string) => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Cart')
    .delete()
    .eq('cart_product_id', productId);
  if (error) {
    console.error('Error deleting record:', error);
    return;
  }
  revalidatePath('/cart');
  return data;
};

export const toggleCheckbox = async (productId: string, isChecked: boolean) => {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer
    .from('Cart')
    .update({ is_checked: isChecked })
    .eq('cart_product_id', productId);

  revalidatePath('/cart');
  return data;
};

export interface IsCheck {
  is_checked: boolean;
}

export const getCartIsChecked = async (productId: string, userId: string): Promise<IsCheck> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Cart')
    .select('is_checked')
    .eq('cart_product_id', productId)
    .eq('cart_user_id', userId);

  return data![0] as IsCheck;
};

export const getCheckedCartDatas = async (userId: string) => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Cart')
    .select()
    .eq('is_checked', true)
    .eq('cart_user_id', userId);
  return data;
};

export const allToggleCheckbox = async (
  userId: string,
  productIds: string[],
  newCheckedStatus: boolean
) => {
  const supabaseSever = createClient();

  const { error } = await supabaseSever
    .from('Cart')
    .update({ is_checked: newCheckedStatus })
    .eq('cart_user_id', userId)
    .in('cart_product_id', productIds);

  // revalidatePath('/cart');
};

export const deleteSelectCart = async (userId: string) => {
  const supabaseSever = createClient();

  const { data, error } = await supabaseSever
    .from('Cart')
    .delete()
    .eq('is_checked', true)
    .eq('cart_user_id', userId);

  revalidatePath('/cart');
  return data;
};
