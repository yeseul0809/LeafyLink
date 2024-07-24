import supabase from "@/supabase/supabaseClient"
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const {data, error} = await supabase.from('Review').insert([reviewData]);
    console.log(reviewData.review_product_id)
    // body 받아오는 거 찾아오기
    if(error) {
        console.error('리뷰 데이터 삽입 중 에러발생', error)
       
    }

    revalidatePath(`/products/${reviewData.review_product_id}`);
    return NextResponse.json(data);
}
