'use server';

import { createClient } from '@/supabase/supabaseServer';
import { v4 as uuidv4 } from 'uuid';

export const getVideos = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'X-Auth-Email': 'raccoonboy0803@gmail.com',
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
    }
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

export const startLiveStreaming = async (_: any, formData: FormData) => {
  const supabaseServer = createClient();

  const InputDatas = {
    liveTitle: formData.get('liveTitle'),
    product: formData.get('product') as string,
    description: formData.get('description'),
    category: formData.get('category'),
    thumbnail: formData.get('thumbnail')
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
      },
      body: JSON.stringify({
        meta: {
          name: InputDatas.liveTitle,
          descriptioin: InputDatas.description,
          product: InputDatas.product
        },
        recording: {
          mode: 'automatic'
        }
      })
    }
  );
  const streamServerData = await response.json();
  const sellerSession = await supabaseServer.auth.getUser();

  const productId = InputDatas.product;
  let splitProductId;
  if (productId) {
    splitProductId = productId.split('/')[2];
  }

  if (InputDatas.thumbnail instanceof File) {
    const filename = `stream/${sellerSession.data.user?.id}/${uuidv4()}-${InputDatas.thumbnail.name}`;
    const response = await supabaseServer.storage
      .from('product-thumbnail')
      .upload(filename, InputDatas.thumbnail, {
        cacheControl: '1800',
        upsert: false
      });

    let fileUrl;
    if (response.data) {
      fileUrl = response.data.path;
    }

    const urlResponse = supabaseServer.storage.from('product-thumbnail').getPublicUrl(`${fileUrl}`);
    InputDatas.thumbnail = urlResponse.data.publicUrl!;
  }

  const stream = {
    livestream_seller_id: sellerSession.data.user!.id,
    livestream_product_id: splitProductId,
    stream_title: InputDatas.liveTitle,
    product_title: InputDatas.product,
    description: InputDatas.description,
    stream_id: streamServerData.result.uid,
    stream_key: streamServerData.result.rtmps.streamKey,
    video_uid: streamServerData.result.uid,
    thumbnail_url: InputDatas.thumbnail,
    category: InputDatas.category
  };

  const { data, error } = await supabaseServer.from('Livestream').insert([stream]).select('*');

  if (error) {
    console.log('error::', error);
  }
};
