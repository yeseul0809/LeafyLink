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
