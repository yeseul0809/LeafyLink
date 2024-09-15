'use client';

import useUser from '@/hooks/useUser';
import { createClient } from '@/supabase/supabaseClient';
import { Message } from '@/types/message';
import React, { useEffect, useState } from 'react';
import { fetchSellerInfo, fetchUserInfo } from '../_utils/fetchInfo';
import MessageInput from '../_components/MessageInput';
import MessageList from '../_components/MessageList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteChatroom } from '../_utils/chatroomUtils';

interface ParamsProps {
  params: { id: string };
}

function ChatPage({ params }: ParamsProps) {
  const supabase = createClient();
  const [isMessagesLoaded, setIsMessagesLoaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sellerId, setSellerId] = useState<string>('');
  const [otherUserInfo, setOtherUserInfo] = useState<{
    user_name?: string;
    business_name?: string;
    avatar_url: string;
  } | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const { id: chatroomId } = params;
  const { user } = useUser();
  const router = useRouter();

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
        .on(
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: 'Message'
          },
          (payload) => {
            setMessages((messages) =>
              messages.filter((message) => message.message_id !== payload.old.message_id)
            );
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
      .select('chatroom_seller_id, chatroom_user_id')
      .eq('chatroom_id', chatroomId)
      .single();

    if (error || !data) {
      return;
    }

    setSellerId(data.chatroom_seller_id);
    setIsSeller(data.chatroom_seller_id === user.id);

    const buyerInfo = await fetchUserInfo(data.chatroom_user_id);
    const sellerInfo = await fetchSellerInfo(data.chatroom_seller_id);

    if (data.chatroom_seller_id === user.id) {
      if (buyerInfo) {
        setOtherUserInfo({
          user_name: buyerInfo.user_name,
          avatar_url: buyerInfo.avatar_url,
          business_name: sellerInfo?.business_name
        });
      }
    } else {
      setOtherUserInfo({
        user_name: buyerInfo?.user_name,
        avatar_url: sellerInfo?.avatar_url,
        business_name: sellerInfo?.business_name
      });
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

  const handleOutChatroom = async () => {
    try {
      await deleteChatroom(chatroomId);
      router.push('/chat');
    } catch (error) {
      console.error('채팅방 삭제 중 에러 발생', error);
    }
  };

  const sendMessage = async (e: React.FormEvent, text: string | null, imageUrl: string | null) => {
    e.preventDefault();

    const { error } = await supabase.from('Message').insert([
      {
        message_chatroom_id: chatroomId,
        message_user_id: user.id,
        message_seller_id: sellerId,
        payload: text || null, // 텍스트가 있으면 텍스트 전송, 없으면 null
        image_url: imageUrl || null, // 이미지가 있으면 이미지 전송, 없으면 null
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
    <div className="flex flex-col items-center justify-center mx-auto w-[335px] md:w-[610px] pt-[30px] pb-3 md:pb-8">
      <div className="flex items-center mb-7 w-full">
        <button onClick={() => router.push('/chat')} className="mr-2 md:mr-8 md:w-9 md:h-9">
          <Image
            src={'/icons/back.svg'}
            alt="back"
            width={28}
            height={28}
            className="md:w-9 md:h-9"
          />
        </button>
        {otherUserInfo && (
          <>
            <Image
              src={otherUserInfo.avatar_url || '/default-avatar.png'}
              alt="Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full mr-3 md:mr-4"
            />
            <span className="text-[15px] md:text-xl font-bold">
              {isSeller ? otherUserInfo.user_name : otherUserInfo.business_name}
            </span>
          </>
        )}
        <button onClick={handleOutChatroom} className="ml-auto md:w-7 md:h-7">
          <Image
            src={'/icons/out.svg'}
            alt="out"
            width={28}
            height={28}
            className="md:w-7 md:h-7"
          />
        </button>
      </div>
      <div className="w-full border-t border-#E5E5EC"></div>
      <MessageList
        isMessagesLoaded={isMessagesLoaded}
        messages={messages}
        userId={user?.id}
        otherUserInfo={otherUserInfo}
      />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        chatroomId={chatroomId}
        user={user}
        sellerId={sellerId}
      />
    </div>
  );
}

export default ChatPage;
