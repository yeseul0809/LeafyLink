'use client';

import useUser from '@/hooks/useUser';
import { createClient } from '@/supabase/supabaseClient';
import { Message } from '@/types/message';
import React, { useEffect, useState } from 'react';

interface ParamsProps {
  params: { id: string };
}

function ChatPage({ params }: ParamsProps) {
  const supabase = createClient();
  const [isMessagesLoaded, setIsMessagesLoaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sellerId, setSellerId] = useState<string>('');
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const { id: chatroomId } = params;
  const { user } = useUser();

  useEffect(() => {
    if (chatroomId) {
      fetchChatroomInfo();
      fetchMessages();

      const channel = supabase
        .channel('Message')
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

  const fetchChatroomInfo = async () => {
    const { data, error } = await supabase
      .from('Chatroom')
      .select('chatroom_seller_id')
      .eq('chatroom_id', chatroomId)
      .single();

    if (error) {
      console.log('채팅방 seller 정보 가져오는 중 에러발생', error);
    } else if (data) {
      setSellerId(data.chatroom_seller_id);
      // setIsSeller(data.chatroom_seller_id === user.id);
    }
  };

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

    if (!chatroomId || !user) {
      console.error('채팅방 ID 또는 사용자 정보가 누락되었습니다.');
      return;
    }

    const { error } = await supabase.from('Message').insert([
      {
        message_chatroom_id: chatroomId,
        message_user_id: user.id,
        message_seller_id: sellerId,
        payload: newMessage,
        is_read: false
      }
    ]);

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
          <p>이전 대화내역이 없습니다.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.message_id}>
              <strong>{msg.message_user_id === user.id ? '나' : '상대방'}:</strong> {msg.payload}
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
