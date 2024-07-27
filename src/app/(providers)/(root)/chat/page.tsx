'use client';

import useUser from '@/hooks/useUser';
import { createClient } from '@/supabase/supabaseClient';
import { Chatroom } from '@/types/chatroom';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ChatListPage() {
  const supabase = createClient();
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchChatrooms = async () => {
        const { data, error } = await supabase
          .from('chatroom')
          .select('*')
          .or(`chatroom_user_id.eq.${user.id},chatroom_seller_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('채팅 리스트를 가져오는 중 에러 발생', error);
        } else {
          setChatrooms(data as Chatroom[]);
        }
      };
      fetchChatrooms();

      const channel = supabase
        .channel('public:chatroom')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chatroom' },
          (payload) => {
            const newChatroom = payload.new as Chatroom;
            setChatrooms((prevChatrooms) => [newChatroom, ...prevChatrooms]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, supabase]);

  const handleChatroomClick = (chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  };

  return (
    <div>
      <h1>채팅 목록</h1>
      <ul>
        {chatrooms.map((chatroom) => (
          <li key={chatroom.chatroom_id} onClick={() => handleChatroomClick(chatroom.chatroom_id)}>
            <div>{chatroom.chatroom_user_id === user.id ? '판매자' : '구매자'} 이름</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatListPage;
