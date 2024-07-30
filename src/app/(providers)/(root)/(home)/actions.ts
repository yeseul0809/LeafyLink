'use server'
import { createClient } from "@/supabase/supabaseServer"
// supabase 호출을 여기에 모아두고 사용하면 재사용 가능!

export const getProducts = () => {
    const supabase = createClient()
    // 호출 넣어주면 끗
}


// 상품 파는 사람 불러오기. => product안에 있는 sellerId
export const getSellerName = async(sellerId:string) => {
    const supabase = createClient()
    const { data: seller, error } = await supabase
    .from('Seller')
    .select('user_name')
    .eq('seller_id',sellerId)
    .single()
    if (error) throw error; 
    return seller
}
