import React from 'react';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (e: React.FormEvent) => void;
}

function MessageInput({ newMessage, setNewMessage, sendMessage }: MessageInputProps) {
  return (
    <div className="flex w-[375px] md:w-full border-t md:border-t-0 ">
      <form
        onSubmit={sendMessage}
        className="group flex border rounded-full w-full items-center justify-between mx-5 md:mx-0 mt-2 md:mt-5 focus-within:ring-1 focus-within:ring-primary-green-500 bg-secondary-yellow-50"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
          className="flex-grow p-3 rounded-full h-[36px] md:h-[56px] focus:outline-none bg-secondary-yellow-50 placeholder:text-[13px] md:placeholder:text-[16px]"
          required
        />
        <button
          type="submit"
          className="p-3 rounded-full bg-no-repeat bg-center focus:outline-none bg-[url('/icons/send.svg')] group-focus-within:bg-[url('/icons/sendcolor.svg')] bg-[length:20px] w-[40px] h-[40px]"
        ></button>
      </form>
    </div>
  );
}

export default MessageInput;
