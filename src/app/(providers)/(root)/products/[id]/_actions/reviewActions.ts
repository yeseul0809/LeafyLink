'use server';

import { revalidatePath } from "next/cache";
import { ReviewInput } from "@/types/review";
import supabase from "@/supabase/supabaseClient";

export  async function handleActionSubmit(reviewData: ReviewInput) {
    const { data, error } = await supabase.from('Review').insert([reviewData]);

    if (error) {
      console.error('리뷰 데이터 삽입 중 에러발생', error);
      return;
    }

    revalidatePath(`/products/${reviewData.review_product_id}`);
    return data;
  }

export default handleActionSubmit