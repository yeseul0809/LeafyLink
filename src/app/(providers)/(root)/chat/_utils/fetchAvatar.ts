import { createClient } from "@/supabase/supabaseClient"


const supabase = createClient();

export const fetchUserAvatar = async (userId: string) => {
    const {data, error} = await supabase.from('User').select('avatar_url').eq('user_id', userId).single();

    if(error) {
        console.error('유저 프로필 이미지 가져오는 중 에러발생', error);
    } 

    return data?.avatar_url || null;
}

export const fetchSellerAvatar = async (sellerId: string) => {
    const {data, error} = await supabase.from('Seller').select('avatar_url').eq('seller_id', sellerId).single();
    
    if(error) {
        console.error('판매자 프로필 이미지 가져오는 중 에러발생', error)
    }

    return data?.avatar_url || null
}