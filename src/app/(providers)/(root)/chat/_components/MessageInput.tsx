import { createClient } from '@/supabase/supabaseClient';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (e: React.FormEvent) => void;
  chatroomId: string;
  user: { id: string };
  sellerId: string;
}
const supabase = createClient();

function MessageInput({
  newMessage,
  setNewMessage,
  sendMessage,
  chatroomId,
  user,
  sellerId
}: MessageInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 이미지 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // 스토리지에 파일 업로드
  const handleFileUpload = async () => {
    if (!imageFile) return null;

    const { data, error } = await supabase.storage
      .from('message-image')
      .upload(`message_images/${uuidv4()}`, imageFile);

    if (error) {
      console.error('채팅 이미지메시지 업로드 중 에러 발생', error.message);
      return null;
    }

    const publicUrl = supabase.storage.from('message-image').getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = null;

    if (imageFile) {
      imageUrl = await handleFileUpload();
      setImageFile(null);
    }

    if (newMessage || imageUrl) {
      await sendMessageWithImage(newMessage || null, imageUrl ? imageUrl.data.publicUrl : null);
    }
  };

  const sendMessageWithImage = async (text: string | null, imageUrl: string | null) => {
    const { error } = await supabase.from('Message').insert([
      {
        message_chatroom_id: chatroomId,
        message_user_id: user.id,
        message_seller_id: sellerId,
        payload: text,
        image_url: imageUrl,
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
    <div className="flex w-[375px] md:w-full border-t md:border-t-0 ">
      <form
        onSubmit={handleSubmit}
        className="group flex border rounded-full w-full items-center justify-between mx-5 md:mx-0 mt-2 md:mt-5 focus-within:ring-1 focus-within:ring-primary-green-500 bg-secondary-yellow-50"
      >
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
          className="flex-grow p-3 rounded-full h-[36px] md:h-[56px] focus:outline-none bg-secondary-yellow-50 placeholder:text-[13px] md:placeholder:text-[16px]"
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
