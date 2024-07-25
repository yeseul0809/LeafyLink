'use server';

import { revalidatePath } from "next/cache";
import { ReviewInput } from "@/types/review";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createClient } from "@/supabase/supabaseServer";
import { cache } from "react";
// import supabaseSever from "@/supabase/supabaseServer";

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

 async function getProductRequest(id: string){
  const supabseServer:SupabaseClient<Database> = createClient();
  const { data: product, error } = await supabseServer
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

export const getProduct = cache(getProductRequest);

// export async function getUser(){
//   const {data:userData, error} = await supabaseSever.auth.getUser();

//     if (error) {
//       console.error('로그인한 유저 정보 가져오는 중 에러 발생', error);
//       return;
//     }

//   return userData;
// }