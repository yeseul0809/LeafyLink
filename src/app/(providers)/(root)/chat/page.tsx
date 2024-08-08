'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSellerInfo, fetchUserInfo } from './_utils/fetchInfo';
import Image from 'next/image';
import { createClient } from '@/supabase/supabaseClient';
import useChatrooms from './_hooks/useChatrooms';
import { timeForToday } from './_utils/timeUtils';

const supabase = createClient();

function ChatListPage() {
  const { user } = useUser();
  const router = useRouter();
  const { chatrooms } = useChatrooms(user ? user.id : '');
  const [avatars, setAvatars] = useState<{
    [key: string]: { avatar_url: string; user_name?: string; business_name?: string } | null;
  }>({});
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
  const [latestMessages, setLatestMessages] = useState<{
    [key: string]: { payload: string; createdAt: string };
  }>({});

  useEffect(() => {
    const fetchInfo = async () => {
      for (const chatroom of chatrooms) {
        const userInfo = await fetchUserInfo(chatroom.chatroom_user_id);
        const sellerInfo = await fetchSellerInfo(chatroom.chatroom_seller_id);

        setAvatars((prevAvatars) => ({
          ...prevAvatars,
          [chatroom.chatroom_user_id]: {
            avatar_url: userInfo?.avatar_url,
            user_name: userInfo?.user_name
          },
          [chatroom.chatroom_seller_id]: {
            avatar_url: sellerInfo?.avatar_url,
            business_name: sellerInfo?.business_name
          }
        }));

        const { data: messages, error } = await supabase
          .from('Message')
          .select('payload, created_at')
          .eq('message_chatroom_id', chatroom.chatroom_id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('최근 메세지 가져오는 중 에러발생', error);
        } else if (messages.length > 0) {
          const latestMessage = messages[0];
          setLatestMessages((prevMessages) => ({
            ...prevMessages,
            [chatroom.chatroom_id]: {
              payload: latestMessage.payload,
              createdAt: latestMessage.created_at
            }
          }));
        }
      }
    };

    fetchInfo();
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
          counts[chatroom.chatroom_id] = data.length;
        }
      }
      setUnreadCounts(counts);
    };

    fetchUnreadCounts();
  }, [chatrooms, user]);

  const handleChatroomClick = (chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  };

  const sortedChatrooms = chatrooms.slice().sort((a, b) => {
    const chatRoomA = latestMessages[a.chatroom_id]
      ? new Date(latestMessages[a.chatroom_id].createdAt).getTime()
      : new Date(0).getTime();
    const chatRoomB = latestMessages[b.chatroom_id]
      ? new Date(latestMessages[b.chatroom_id].createdAt).getTime()
      : new Date(0).getTime();
    return chatRoomB - chatRoomA;
  });

  return (
    <div className="max-w-[375px] md:max-w-[650px] mx-auto mt-4 md:mt-12 mb-[70px] md:mb-[180px]">
      <h1 className="text-[20px] md:text-[32px] font-semibold md:font-bold border-b pb-4 md:pb-8 flex justify-center">
        상담톡
      </h1>
      <div className="flex justify-center w-full">
        {chatrooms.length === 0 ? (
          <p className="mt-20 xs:text-[14px] md:text-[15px]">채팅 상대가 아직 없습니다.</p>
        ) : (
          <ul className="flex w-full xs:w-[375px] md:w-[650px] flex-col items-center">
            {sortedChatrooms.map((chatroom) => {
              const isUser = user.id === chatroom.chatroom_user_id;
              const otherParty = isUser ? chatroom.chatroom_seller_id : chatroom.chatroom_user_id;
              const otherInfo = avatars[otherParty];
              const latestMessage = latestMessages[chatroom.chatroom_id];
              return (
                <li
                  key={chatroom.chatroom_id}
                  onClick={() => handleChatroomClick(chatroom.chatroom_id)}
                  className="bg-white border-b cursor-pointer xs:h-[78px]  md:h-[100px] w-full px-5 py-4 md:py-6 hover:bg-secondary-yellow-50 transition"
                >
                  <section className="flex items-start md:pb-8 w-full sm:p-0">
                    <div className="w-10 h-10 md:w-[48px] md:h-[48px] flex-shrink-0 rounded-full overflow-hidden mr-4">
                      <Image
                        src={otherInfo?.avatar_url || '/default-avatar.png'}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="object-cover md:w-[48px] md:h-[48px]"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <p className="block text-[14px] font-semibold md:text-[18px] leading-3">
                          {isUser
                            ? otherInfo?.business_name || 'Unknown'
                            : otherInfo?.user_name || 'Unknown'}
                        </p>
                        {latestMessage && (
                          <p className="text-[11px] md:text-sm text-gray-400 ml-auto">
                            {timeForToday(latestMessage.createdAt)}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center w-full md:mt-2">
                        <p className="text-[12px] md:text-sm text-gray-500 flex-1">
                          {latestMessage ? latestMessage.payload : '이전 대화내역이 없습니다.'}
                        </p>
                        {unreadCounts[chatroom.chatroom_id] > 0 && (
                          <div className="w-4 h-4 md:w-5 md:h-5 bg-primary-green-500 text-white rounded-full flex items-center justify-center text-[11px] md:text-xs ml-2">
                            {unreadCounts[chatroom.chatroom_id]}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChatListPage;
