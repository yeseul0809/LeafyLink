'use server';

import { revalidatePath } from "next/cache";
import { ReviewInput } from "@/types/review";
import { createClient } from "@/supabase/supabaseServer";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function createReview(reviewData: ReviewInput) {
    const supabseServer:SupabaseClient<Database> = createClient();
    const { data, error } = await supabseServer.from('Review').insert([reviewData]).select('*');

    if (error) {
      console.error('리뷰 데이터 삽입 중 에러발생', error);
      return;
    }

    revalidatePath(`/products/${reviewData.review_product_id}`);
    return data;
  }

export async function getReviews(reviewProductId: string){
  const supabseServer:SupabaseClient<Database> = createClient();
  const { data: reviews, error } = await supabseServer
  .from('Review')
  .select('*')
  .eq('review_product_id', reviewProductId);

  if (error) {
    console.error('리뷰 데이터 가져오는 중 에러발생', error);
    return;
  }

  return reviews;
}