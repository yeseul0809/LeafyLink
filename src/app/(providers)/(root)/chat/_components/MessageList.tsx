import React from 'react';
import { formatDate } from '../_utils/timeUtils';
import { Message } from '@/types/message';

interface MessageListProps {
  isMessagesLoaded: boolean;
  messages: Message[];
  userId: string;
}

function MessageList({ isMessagesLoaded, messages, userId }: MessageListProps) {
  return (
    <div className="w-full">
      {isMessagesLoaded && messages.length === 0 ? (
        <p>이전 대화내역이 없습니다.</p>
      ) : (
        <div>
          {messages.map((msg, index) => {
            const messageDate = new Date(msg.created_at);
            const addHoursDate = new Date(messageDate.getTime() + 9 * 60 * 60 * 1000);
            const formattedDate = formatDate(addHoursDate);

            const previousMessage = messages[index - 1];
            const previousFormattedDate = previousMessage
              ? formatDate(new Date(previousMessage.created_at))
              : null;

            const dateDisplay = formattedDate !== previousFormattedDate && (
              <div key={`date-${msg.message_id}`} className="text-center text-gray-500 my-4">
                {formattedDate}
              </div>
            );

            return (
              <div key={msg.message_id} className="my-2">
                {dateDisplay}
                <div className={msg.message_user_id === userId ? 'text-right' : 'text-left'}>
                  <div
                    className={`inline-block p-2 ${msg.message_user_id === userId ? 'bg-green-200' : 'bg-gray-200'} rounded-lg`}
                  >
                    <div>{msg.payload}</div>
                    <div className="text-xs text-gray-600">
                      {addHoursDate.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
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
