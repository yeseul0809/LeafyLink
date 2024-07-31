import React from 'react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (e: React.FormEvent) => void;
}

function MessageInput({ newMessage, setNewMessage, sendMessage }: MessageInputProps) {
  return (
    <form
      onSubmit={sendMessage}
      className="flex border rounded-full w-full items-center justify-between mt-5"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-grow p-3 rounded-l-full"
        required
      />
      <button
        type="submit"
        className="p-3 mr-3 rounded-r-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('/icons/send.svg')`,
          backgroundSize: '20px',
          width: '40px',
          height: '40px'
        }}
      ></button>
    </form>
  );
}

export default MessageInput;
