'use server';

import supabaseSever from '@/supabase/supabaseServer';

export const getVideos = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'X-Auth-Email': 'raccoonboy0803@gmail.com',
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
    },
  };

  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
      options
    )
  ).json();

  return response;
};

export const getStreamId = async (uid: string) => {
  const {data,error} = await supabaseSever.from('Livestream').select('id').eq('video_uid',uid)
  // return response.length > 0 ? response[0].id : null;
  if (error) {
    console.error('Error fetching data:', error);
  } else {
  return data
  }
};