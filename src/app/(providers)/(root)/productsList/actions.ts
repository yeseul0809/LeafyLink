'use server';

import { createClient } from '@/supabase/supabaseServer';
import { GoodsDataResponse } from '@/types/product';

export const getSeedData = async (limit: number, offset: number): Promise<GoodsDataResponse> => {
  const supabase = createClient();
  const {
    data: Product,
    error,
    count
  } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('category', '씨앗')
    .range(offset, offset + limit - 1);

  return { Product, totalCount: count };
};

export const getSeedlingData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse> => {
  const supabase = createClient();
  const {
    data: Product,
    error,
    count
  } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('category', '모종')
    .range(offset, offset + limit - 1);

  return { Product, totalCount: count };
};

export const getKitData = async (limit: number, offset: number): Promise<GoodsDataResponse> => {
  const supabase = createClient();
  const {
    data: Product,
    error,
    count
  } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('category', '재배키트')
    .range(offset, offset + limit - 1);

  return { Product, totalCount: count };
};

export const getSoilData = async (limit: number, offset: number): Promise<GoodsDataResponse> => {
  const supabase = createClient();
  const {
    data: Product,
    error,
    count
  } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('category', '흙,비료')
    .range(offset, offset + limit - 1);

  return { Product, totalCount: count };
};

export const getGoodsData = async (limit: number, offset: number): Promise<GoodsDataResponse> => {
  const supabase = createClient();
  const {
    data: Product,
    error,
    count
  } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('category', '원예용품')
    .range(offset, offset + limit - 1);

  return { Product, totalCount: count };
};

export const getCategoryData = async (category: string) => {
  const supabase = createClient();
  const { data: productData, error: productError } = await supabase
    .from('Product')
    .select('*')
    .eq('category', category)
    .neq('stock', 0);

  if (productError) {
    console.error(productError);
    return [];
  }

  const sellerIds = Array.from(new Set(productData.map((product) => product.product_seller_id)));

  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('seller_id, business_name')
    .in('seller_id', sellerIds);

  if (sellerError) {
    console.error(sellerError);
    return [];
  }

  const sellerMap = sellerData.reduce(
    (acc, seller) => {
      acc[seller.seller_id] = seller.business_name;
      return acc;
    },
    {} as Record<string, string>
  );

  const productsWithBusinessName = productData.map((product) => ({
    ...product,
    business_name: sellerMap[product.product_seller_id] || 'Unknown'
  }));

  return productsWithBusinessName;
};
