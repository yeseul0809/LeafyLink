import React from 'react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (e: React.FormEvent) => void;
}

function MessageInput({ newMessage, setNewMessage, sendMessage }: MessageInputProps) {
  return (
    <form onSubmit={sendMessage} className="border rounded-full w-full">
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button type="submit" className="p-3 rounded-r-lg">
        전송
      </button>
    </form>
  );
}

export default MessageInput;
