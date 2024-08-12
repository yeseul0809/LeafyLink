'use server';

import { revalidatePath } from 'next/cache';
import { Review, ReviewInput } from '@/types/review';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { createClient } from '@/supabase/supabaseServer';
import { cache } from 'react';

export async function createReview(reviewData: ReviewInput): Promise<Review[]> {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data, error } = await supabaseServer.from('Review').insert(reviewData).select('*');

  if (error) throw error;

  revalidatePath(`/products/${reviewData.review_product_id}`);
  return data;
}

export async function updateReview(reviewId: string, reviewData: ReviewInput) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data, error } = await supabaseServer
    .from('Review')
    .update(reviewData)
    .eq('review_id', reviewId)
    .select('*');

  if (error) throw error;
  revalidatePath(`/products/${reviewData.review_product_id}`);
  return data;
}

export async function deleteReview(reviewId: string, reviewProductId: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data, error } = await supabaseServer
    .from('Review')
    .delete()
    .eq('review_id', reviewId)
    .select('*');

  if (error) throw error;
  revalidatePath(`/products/${reviewProductId}`);
  return data;
}

export async function getReviews(reviewProductId: string, limit: number, offset: number) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const {
    data: reviews,
    error,
    count
  } = await supabaseServer
    .from('Review')
    .select('*', { count: 'exact' })
    .eq('review_product_id', reviewProductId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { reviews, totalCount: count };
}

export async function getProductRequest(id: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data: product, error } = await supabaseServer
    .from('Product')
    .select('*')
    .eq('product_id', id)
    .single();

  if (error || !product) {
    console.error('해당 상품을 찾을 수 없습니다.', error);
    return;
  }

  return product;
}

// 제품을 구매했는지 order 테이블에서 확인
export async function getUserPurchasedProducts(userId: string, productId: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data, error } = await supabaseServer
    .from('Order')
    .select('order_product_id')
    .eq('order_user_id', userId)
    .eq('order_product_id', productId);

  if (error) {
    console.error('구매 내역 조회 중 에러 발생:', error);
    return null;
  }

  return data;
}
