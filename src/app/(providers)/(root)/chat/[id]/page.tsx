'use client';

import useUser from '@/hooks/useUser';
import { createClient } from '@/supabase/supabaseClient';
import { Message } from '@/types/message';
import React, { useEffect, useState } from 'react';
import { addHours, formatDate } from '../_utils/timeUtils';
import MessageInput from '../_components/MessageInput';
import MessageList from '../_components/MessageList';

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
    if (chatroomId && user) {
      fetchChatroomInfo();
      fetchMessages();
      messagesCheckRead();

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
  }, [chatroomId, user]);

  const fetchChatroomInfo = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('Chatroom')
      .select('chatroom_seller_id')
      .eq('chatroom_id', chatroomId)
      .single();

    if (error) {
      console.log('채팅방 정보 가져오는 중 에러발생', error);
    } else if (data) {
      setSellerId(data.chatroom_seller_id);
      setIsSeller(data.chatroom_seller_id === user.id);
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

  const messagesCheckRead = async () => {
    if (!user) return;

    if (isSeller) {
      // 판매자가 메시지를 읽을 경우
      const { error } = await supabase
        .from('Message')
        .update({ is_read: true })
        .eq('message_chatroom_id', chatroomId)
        .neq('message_user_id', user.id) // 구매자가 보낸 메시지만 업데이트
        .eq('is_read', false);

      if (error) {
        console.error('구매자가 보낸 메세지 읽음 업데이트 중 에러발생', error);
      }
    } else {
      // 구매자가 메시지를 읽을 경우
      const { error } = await supabase
        .from('Message')
        .update({ is_read: true })
        .eq('message_chatroom_id', chatroomId)
        .neq('message_user_id', user.id) // 판매자가 보낸 메시지만 업데이트
        .eq('is_read', false);

      if (error) {
        console.error('판매자가 보낸 메세지 읽음 업데이트 중 에러발생', error);
      }
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto my-20 w-[610px]">
      <MessageList isMessagesLoaded={isMessagesLoaded} messages={messages} userId={user?.id} />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
export default ChatPage;