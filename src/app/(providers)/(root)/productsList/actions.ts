'use server';

import { createClient } from '@/supabase/supabaseServer';
import { GoodsDataResponse } from '@/types/product';
import { ProductWithBusinessName } from '../(home)/actions';

export const getSeedData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData('씨앗');
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
};

export const getSeedlingData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData('모종');
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
};

export const getKitData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData('재배키트');
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
};

export const getSoilData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData('흙,비료');
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
};

export const getGoodsData = async (
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData('원예용품');
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
};

export const getDataByCategory = async (
  category: string,
  limit: number,
  offset: number
): Promise<GoodsDataResponse & { Product: ProductWithBusinessName[] }> => {
  const productData = await getCategoryData(category);
  const totalCount = productData.length;

  const paginatedData = productData.slice(offset, offset + limit);

  return {
    Product: paginatedData,
    totalCount: totalCount
  };
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
