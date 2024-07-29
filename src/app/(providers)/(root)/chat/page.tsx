'use client';

import useChatrooms from '@/hooks/useChatrooms';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

function ChatListPage() {
  const { user } = useUser();
  const { chatrooms } = useChatrooms(user.id);
  const router = useRouter();

  const handleChatroomClick = (chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  };

  return (
    <div>
      <h1>채팅 목록</h1>
      <ul>
        {chatrooms.map((chatroom) => (
          <li key={chatroom.chatroom_id} onClick={() => handleChatroomClick(chatroom.chatroom_id)}>
            <div>
              {user.id === chatroom.chatroom_user_id ? (
                <strong>구매자 ID: {chatroom.chatroom_user_id}</strong>
              ) : (
                <strong>판매자 ID: {chatroom.chatroom_seller_id}</strong>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatListPage;
