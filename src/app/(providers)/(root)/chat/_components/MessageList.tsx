import React, { useEffect, useRef } from 'react';
import { addHours, formatDate } from '../_utils/timeUtils';
import { Message } from '@/types/message';
import Image from 'next/image';

interface MessageListProps {
  isMessagesLoaded: boolean;
  messages: Message[];
  userId: string;
  otherUserInfo: { user_name?: string; business_name?: string; avatar_url: string } | null;
}

function MessageList({ isMessagesLoaded, messages, userId, otherUserInfo }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full max-h-[484px] overflow-y-scroll md:overflow-y-auto custom-scrollbar md:pr-[14px]">
      {isMessagesLoaded && messages.length === 0 ? (
        <p className="flex justify-center py-7 md:pb-0">이전 대화내역이 없습니다.</p>
      ) : (
        <div>
          {messages.map((msg, index) => {
            const messageDate = new Date(msg.created_at);
            const addHoursDate = addHours(messageDate, 9);
            const formattedDate = formatDate(addHoursDate);

            const previousMessage = messages[index - 1];
            const previousFormattedDate = previousMessage
              ? formatDate(addHours(new Date(previousMessage.created_at), 9))
              : null;

            const displayDate = formattedDate !== previousFormattedDate;

            const isCurrentUser = msg.message_user_id === userId;

            return (
              <div key={msg.message_id} className="mb-3 md:mb-4">
                <div className="flex items-center">
                  {displayDate && (
                    <span
                      key={`date-${msg.message_id}`}
                      className="w-[81px] h-[28px] md:w-[89px] md:h-[32px] text:[14px] md:text-[16px] leading-[24px] text-center mx-auto text-gray-500 mt-3 mb-3 md:mt-6 md:mb-5 md:py-1 md:px-3 rounded-[22px] bg-secondary-yellow-100 "
                    >
                      {formattedDate}
                    </span>
                  )}
                </div>
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-end">
                    {!isCurrentUser && otherUserInfo && (
                      <Image
                        src={otherUserInfo.avatar_url || '/default-avatar.png'}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full mr-3 md:mr-4"
                      />
                    )}
                    {isCurrentUser && (
                      <div className="text-[11px] md:text-xs text-gray-600 mr-2">
                        {addHoursDate.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                    <div
                      className={`inline-block px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-primary-green-500 text-white rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[8px]'
                          : 'bg-BG/Regular rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[8px] rounded-br-[20px]'
                      }`}
                    >
                      {msg.image_url && (
                        <Image
                          src={msg.image_url}
                          alt="Sent Image"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      )}
                      {msg.payload && (
                        <div className="text-[14px] md:text-[16px]">{msg.payload}</div>
                      )}
                    </div>
                    {!isCurrentUser && (
                      <div className="text-xs text-font/sub2 ml-2">
                        {addHoursDate.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default MessageList;
