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

export const fetchUnreadCounts = async (
  user: any,
  chatrooms: any[],
  setUnreadCounts: (counts: { [key: string]: number }) => void
) => {
  const counts: { [key: string]: number } = {};

  for (const chatroom of chatrooms) {
    let data, error;

    if (user.id === chatroom.chatroom_user_id) {
      // 구매자일 때
      ({ data, error } = await supabase
        .from('Message')
        .select('is_read', { count: 'exact' })
        .eq('message_chatroom_id', chatroom.chatroom_id)
        .eq('is_read', false)
        .neq('message_user_id', user.id));
    } else {
      // 판매자일 때
      ({ data, error } = await supabase
        .from('Message')
        .select('is_read', { count: 'exact' })
        .eq('message_chatroom_id', chatroom.chatroom_id)
        .eq('is_read', false)
        .neq('message_user_id', chatroom.chatroom_seller_id));
    }

    if (error) {
      console.error('읽지 않은 메세지 수 가져오는 중 에러발생', error);
    } else if (data) {
      counts[chatroom.chatroom_id] = data.length;
    }
  }
  setUnreadCounts(counts);
};
