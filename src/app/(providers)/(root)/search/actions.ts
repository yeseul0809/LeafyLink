import { createClient } from '@/supabase/supabaseClient';

interface Product {
  product_id: string;
  category: string;
  title: string;
  price: number;
  thumbnail_url: string;
  description: string;
  stock: number;
  created_at: string;
  updated_at: string;
  productseller_id: string;
}

export const getAllProductDatas = async (keyword: string): Promise<Product[]> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Product')
    .select()
    .ilike('title', `%${keyword}%`);
  return data as Product[];
};

export const getProductDatas = async (
  keyword: string,
  page: number = 1,
  perPage: number = 20
): Promise<Product[]> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Product')
    .select()
    .ilike('title', `%${keyword}%`)
    .range((page - 1) * perPage, page * perPage - 1);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
};

export const getTotalPages = async (keyword: string, perPage: number = 20): Promise<number> => {
  const supabaseServer = createClient();
  const { count, error } = await supabaseServer
    .from('Product')
    .select('*', { count: 'exact' })
    .ilike('title', `%${keyword}%`);

  if (error) {
    console.error('Error fetching total count:', error);
    return 1;
  }

  return Math.ceil((count || 0) / perPage);
};
