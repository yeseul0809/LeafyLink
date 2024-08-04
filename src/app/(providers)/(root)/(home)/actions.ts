'use server';
import { createClient } from '@/supabase/supabaseServer';
import { Order } from '@/types/order';
import { Product } from '@/types/product';

export const getProducts = async () => {
  const supabase = createClient();
  const { data: product, error } = await supabase.from('Product').select('*');
  if (error) throw error;
  return product;
};

export const getSellerName = async (sellerId: string) => {
  const supabase = createClient();
  const { data: seller, error } = await supabase
    .from('Seller')
    .select('business_name')
    .eq('seller_id', sellerId)
    .single();
  if (error) throw error;
  return seller;
};

export const getOrderInfo = async (): Promise<Order[]> => {
  const supabase = createClient();
  const { data: orderProduct, error } = await supabase
    .from('Order')
    .select('*')
    .eq('is_payed', true)
    .order('order_date', { ascending: false })
    .range(0, 100);
  if (error) throw error;
  return orderProduct;
};

export const getRecommendPlant = async () => {
  const supabase = createClient();
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('*')
    .or('category.eq.씨앗, category.eq.모종');

  if (productError) throw productError;
  return products;
};

export const getGoodsproducts = async () => {
  const supabase = createClient();
  const { data: goodsProducts, error: productError } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '원예용품');

  if (productError) throw productError;
  return goodsProducts;
};

export const getBestSellerProducts = async (orderData: Order[]) => {
  const supabase = createClient();

  const { data: products, error: productsError } = await supabase
    .from('Product')
    .select('*')
    .or(
      `product_id.eq.${orderData[0].order_product_id}, product_id.eq.${orderData[1].order_product_id}, product_id.eq.${orderData[2].order_product_id}, product_id.eq.${orderData[3].order_product_id}`
    );
  if (productsError) throw productsError;

  return products as Product[];
};
