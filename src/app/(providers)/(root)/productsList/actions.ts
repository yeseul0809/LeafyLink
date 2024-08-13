'use server';

import { createClient } from '@/supabase/supabaseServer';

export const getSeedData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '씨앗');
  return Product;
};

export const getSeedlingData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '모종');
  return Product;
};

export const getKitData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '재배키트');
  return Product;
};

export const getSoilData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '흙,비료');
  return Product;
};

export const getGoodsData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '원예용품');
  return Product;
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
