'use client';

import useChatrooms from '@/hooks/useChatrooms';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSellerAvatar, fetchUserAvatar } from './_utils/fetchAvatar';
import Image from 'next/image';

function ChatListPage() {
  const { user } = useUser();
  const router = useRouter();
  const { chatrooms } = useChatrooms(user ? user.id : '');
  const [avatars, setAvatars] = useState<{ [key: string]: string | null }>({});

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
              <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs ml-2">
                1
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatListPage;
