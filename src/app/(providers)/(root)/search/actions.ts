'use server';

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

export const getProductCount = async (keyword: string): Promise<number> => {
  const supabaseServer = createClient();

  const { data, error } = await supabaseServer
    .from('Product')
    .select('product_id')
    .ilike('title', `%${keyword}%`);

  if (error) {
    console.error('Error fetching product count:', error);
    return 0;
  }

  return data.length;
};

export const getProductDatas = async (
  keyword: string,
  page: number = 1,
  perPage: number = 20,
  sort: string = 'new'
): Promise<Product[]> => {
  const supabaseServer = createClient();

  let orderByColumn = 'created_at';
  let orderByDirection: 'asc' | 'desc' = 'desc';

  const { data: products, error: productError } = await supabaseServer
    .from('Product')
    .select('product_id, title, price,thumbnail_url,created_at')
    .ilike('title', `%${keyword}%`)
    .neq('stock', 0)
    .range((page - 1) * perPage, page * perPage - 1);

  if (productError) {
    console.error('Error fetching product IDs:', productError);
    return [];
  }

  const productIds = products.map((product) => product.product_id);

  const { data: orders, error: orderError } = await supabaseServer
    .from('Order')
    .select('order_product_id, quantity')
    .in('order_product_id', productIds);

  if (orderError) {
    console.error('Error fetching order quantities:', orderError);
    return [];
  }

  const productQuantities = new Map<string, number>();
  orders.forEach((order) => {
    const currentQty = productQuantities.get(order.order_product_id) || 0;
    productQuantities.set(order.order_product_id, currentQty + order.quantity);
  });

  const { data: reviews, error: reviewError } = await supabaseServer
    .from('Review')
    .select('review_product_id')
    .in('review_product_id', productIds);

  if (reviewError) {
    console.error('Error fetching review counts:', reviewError);
    return [];
  }

  const reviewCounts = new Map<string, number>();
  reviews.forEach((review) => {
    const currentCount = reviewCounts.get(review.review_product_id) || 0;
    reviewCounts.set(review.review_product_id, currentCount + 1);
  });

  const productsWithDetails = products.map((product) => ({
    ...product,
    totalQuantity: productQuantities.get(product.product_id) || 0,
    reviewCount: reviewCounts.get(product.product_id) || 0
  }));

  switch (sort) {
    case 'name':
      productsWithDetails.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'low':
      productsWithDetails.sort((a, b) => a.price - b.price);
      break;
    case 'high':
      productsWithDetails.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      productsWithDetails.sort((a, b) => b.totalQuantity - a.totalQuantity);
      break;
    case 'review':
      productsWithDetails.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      productsWithDetails.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
  }

  return productsWithDetails.map(
    ({ totalQuantity, reviewCount, ...product }) => product
  ) as Product[];
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
