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

// export const getStreamId = async (uid: string) => {
//   const {data,error} = await supabaseSever.from('Livestream').select('id').eq('video_uid',uid)
//   // return response.length > 0 ? response[0].id : null;
//   if (error) {
//     console.error('Error fetching data:', error);
//   } else {
//   return data
//   }
// };

export const startLiveStreaming = async(_:any,formData:FormData) => {
const InputDatas = {
  liveTitle : formData.get('liveTitle'),
  productTitle : formData.get('productTitle'),
  description : formData.get('description'),
 //썸네일이미지,카테고리 추가필요
  
}
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
      body: JSON.stringify({
        meta: {
          name: InputDatas.liveTitle,
        },
        recording: {
          mode: 'automatic',
        },
      }),
    }
  );

  const streamData = await response.json()
  
}


