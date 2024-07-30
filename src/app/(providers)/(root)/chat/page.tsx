'use client';

import useChatrooms from '@/hooks/useChatrooms';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSellerAvatar, fetchUserAvatar } from './_utils/fetchAvatar';
import Image from 'next/image';
import { createClient } from '@/supabase/supabaseClient';

const supabase = createClient();

function ChatListPage() {
  const { user } = useUser();
  const router = useRouter();
  const { chatrooms } = useChatrooms(user ? user.id : '');
  const [avatars, setAvatars] = useState<{ [key: string]: string | null }>({});
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchAvatars = async () => {
      for (const chatroom of chatrooms) {
        const userAvatar = await fetchUserAvatar(chatroom.chatroom_user_id);
        const sellerAvatar = await fetchSellerAvatar(chatroom.chatroom_seller_id);

        setAvatars((prevAvatars) => ({
          ...prevAvatars,
          [chatroom.chatroom_user_id]: userAvatar,
          [chatroom.chatroom_seller_id]: sellerAvatar
        }));
      }
    };

    fetchAvatars();
  }, [chatrooms]);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
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
          console.log(`Chatroom ID: ${chatroom.chatroom_id}, Unread count: ${data.length}`);
          counts[chatroom.chatroom_id] = data.length;
        }
      }
      setUnreadCounts(counts);
    };

    fetchUnreadCounts();
  }, [chatrooms, user]);

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const handleChatroomClick = (chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 my-20">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">상담톡</h1>
      <ul className="space-y-4">
        {chatrooms.map((chatroom) => (
          <li
            key={chatroom.chatroom_id}
            onClick={() => handleChatroomClick(chatroom.chatroom_id)}
            className="flex items-center bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={
                  avatars[
                    user.id === chatroom.chatroom_user_id
                      ? chatroom.chatroom_seller_id
                      : chatroom.chatroom_user_id
                  ] || '/default-avatar.png'
                }
                alt="Avatar"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              {user.id === chatroom.chatroom_user_id ? (
                <strong className="block text-lg">판매자 ID: {chatroom.chatroom_seller_id}</strong>
              ) : (
                <strong className="block text-lg">구매자 ID: {chatroom.chatroom_user_id}</strong>
              )}
            </div>
            <div className="text-right">
              {unreadCounts[chatroom.chatroom_id] > 0 && (
                <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs ml-2">
                  {unreadCounts[chatroom.chatroom_id]}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatListPage;