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

export const deleteChatroom = async (chatroomId: string) => {
  const { data, error } = await supabase.from('Chatroom').delete().eq('chatroom_id', chatroomId);
  if (error) {
    console.error('채팅방 삭제 중 에러 발생', error);
  }
  return data;
};

export const deleteMessage = async (messageId: string) => {
  const { data, error } = await supabase.from('Message').delete().eq('message_id', messageId);
  if (error) {
    console.error('채팅메세지 삭제 중 에러 발생', error);
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

    // 내가 읽지 않은 메시지를 가져옴
    ({ data, error } = await supabase
      .from('Message')
      .select('is_read', { count: 'exact' })
      .eq('message_chatroom_id', chatroom.chatroom_id)
      .eq('is_read', false) // 읽지 않은 메시지 필터
      .neq('message_user_id', user.user_id)); // 상대방이 보낸 메시지 필터

    if (error) {
      console.error('읽지 않은 메세지 수 가져오는 중 에러발생', error);
    } else if (data) {
      counts[chatroom.chatroom_id] = data.length;
    }
  }
  setUnreadCounts(counts);
};
