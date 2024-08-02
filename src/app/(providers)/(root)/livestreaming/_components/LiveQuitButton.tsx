'use client';

import { createClient } from '@/supabase/supabaseClient';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LiveQuitButton({ streamId }: { streamId: string }) {
  const router = useRouter();

  const deleteLivestreamDB = async (streamId: string) => {
    console.log('streamId::', streamId);

    const supabase = createClient();
    // const { error: deleteError } = await supabase
    //   .from('Livestream')
    //   .delete()
    //   .eq('livestream_id', streamId);
    const { error } = await supabase
      .from('Livestream')
      .update({ is_live: false })
      .eq('livestream_id', streamId);
    if (error) {
      console.error('Error end stream:', error);
      return null;
    }
    router.push('/');
  };
  return (
    <button
      onClick={() => deleteLivestreamDB(streamId)}
      className="bg-red-500 py-2 rounded-md text-white"
    >
      방송종료하기
    </button>
  );
}
