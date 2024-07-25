'use server';

import { createClient } from '@/supabase/supabaseServer';

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
  product : formData.get('product') as string,
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
          descriptioin:InputDatas.description,
          product:InputDatas.product
        },
        recording: {
          mode: 'automatic',
        },
      }),
    }
  );
  const streamServerData = await response.json()
  console.log('streamServerData::',streamServerData);
  
  const supabaseServer = createClient()
  const sellerSession = await supabaseServer.auth.getUser() 
  // const productId = await supabaseServer.from('Product').select('product_id').eq('productseller_id',sellerSession.data.user!.id)

  const productId = InputDatas.product  
  let splitProductId
  if (productId) {
     splitProductId = productId.split('/')[2];    
  } 
  
   const stream = {
      livestream_seller_id:sellerSession.data.user!.id,
      livestream_product_id:splitProductId,      
      stream_title: InputDatas.liveTitle,
      product_title: InputDatas.product,
      description: InputDatas.description,
      stream_id: streamServerData.result.uid,
      stream_key: streamServerData.result.rtmps.streamKey,
      video_uid: streamServerData.result.uid,
    } 
  
  const {data,error} = await supabaseServer.from('Livestream').insert([stream]).select('*')
 
  if(error){
    console.log('error::',error);    
  }  

}


