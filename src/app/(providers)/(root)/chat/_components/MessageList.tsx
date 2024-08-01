import React from 'react';
import { addHours, formatDate } from '../_utils/timeUtils';
import { Message } from '@/types/message';

interface MessageListProps {
  isMessagesLoaded: boolean;
  messages: Message[];
  userId: string;
}

function MessageList({ isMessagesLoaded, messages, userId }: MessageListProps) {
  return (
    <div className="w-full border p-5">
      {isMessagesLoaded && messages.length === 0 ? (
        <p>이전 대화내역이 없습니다.</p>
      ) : (
        <div>
          {messages.map((msg, index) => {
            const messageDate = new Date(msg.created_at);
            const addHoursDate = addHours(messageDate, 9);
            const formattedDate = formatDate(addHoursDate);

            const previousMessage = messages[index - 1];
            const previousFormattedDate = previousMessage
              ? formatDate(new Date(previousMessage.created_at))
              : null;

            const dateDisplay = formattedDate !== previousFormattedDate && (
              <div
                key={`date-${msg.message_id}`}
                className="text-center mx-auto text-gray-500 my-8 p-1 w-24 rounded-full bg-secondary-yellow-100 "
              >
                {formattedDate}
              </div>
            );

            const isCurrentUser = msg.message_user_id === userId;

            return (
              <div key={msg.message_id} className="my-2">
                {dateDisplay}
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-end">
                    {isCurrentUser && (
                      <div className="text-xs text-gray-600 mr-2">
                        {addHoursDate.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                    <div
                      className={`inline-block p-3 ${isCurrentUser ? 'bg-primary-green-500 text-white rounded-l-3xl rounded-tr-3xl' : 'bg-gray-200 rounded-r-3xl rounded-tl-3xl'}`}
                    >
                      <div>{msg.payload}</div>
                    </div>
                    {!isCurrentUser && (
                      <div className="text-xs text-gray-600 ml-2">
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
        </div>
      )}
    </div>
  );
}

export default MessageList;
