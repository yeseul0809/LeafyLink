'use client';

import useUser from '@/hooks/useUser';
import { createClient } from '@/supabase/supabaseClient';
import { Message } from '@/types/message';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ParamsProps {
  params: { id: string };
}

function ChatPage({ params }: ParamsProps) {
  const supabase = createClient();
  const [isMessagesLoaded, setIsMessagesLoaded] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  //   const searchParams = useSearchParams();
  //   const chatroomId = searchParams.get('id');
  const { id: chatroomId } = params;
  const { user } = useUser();

  useEffect(() => {
    if (chatroomId) {
      fetchMessages();

      const channel = supabase
        .channel('message')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'Message'
          },
          (payload) => {
            setMessages((messages) => {
              return [...messages, payload.new as Message];
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [chatroomId, supabase]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('Message')
      .select('*')
      .eq('message_chatroom_id', chatroomId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('메세지 가져오는 중 에러발생', error);
    } else {
      setMessages(data as Message[]);
      setIsMessagesLoaded(true);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(chatroomId);
    console.log(user.id);

    if (!chatroomId || !user) {
      console.error('채팅방 ID 또는 사용자 정보가 누락되었습니다.');

      return;
    }

    const { error } = await supabase.from('Message').insert({
      message_chatroom_id: chatroomId,
      message_user_id: user.id,
      message_seller_id: '00067b01-245f-452f-8cd0-8639df5e9ef7',
      payload: newMessage,
      is_read: false
    });

    if (error) {
      console.error('메세지 보내는 중 에러발생', error.message, error.details);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        {isMessagesLoaded && messages.length === 0 ? (
          <p>대화중인 채팅방이 없습니다.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.message_id}>
              <strong>{msg.message_user_id === user.id ? 'You' : 'Seller'}:</strong> {msg.payload}
            </div>
          ))
        )}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          className="bg-green-200"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default ChatPage;
