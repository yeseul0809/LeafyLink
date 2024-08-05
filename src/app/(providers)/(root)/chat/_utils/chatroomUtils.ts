import { createClient } from '@/supabase/supabaseClient';

const supabase = createClient();

export const createChatroom = async (
  chatroomId: string,
  userId: string,
  sellerId: string,
  productId: string
) => {
  const { data, error } = await supabase
    .from('Chatroom')
    .insert([
      {
        chatroom_id: chatroomId,
        chatroom_product_id: productId,
        chatroom_user_id: userId,
        chatroom_seller_id: sellerId
      }
    ])
    .select('*');

  if (error) {
    console.error('채팅방 생성 중 에러 발생', error);
  } else {
  }

  return data;
};

export const findExistingChatroom = async (userId: string, sellerId: string, productId: string) => {
  const { data, error } = await supabase
    .from('Chatroom')
    .select('*')
    .eq('chatroom_user_id', userId)
    .eq('chatroom_seller_id', sellerId)
    .eq('chatroom_product_id', productId);

  if (error) {
    console.error('기존 채팅방 확인 중 에러 발생', error);
    return null;
  } else {
  }

  return data;
};
