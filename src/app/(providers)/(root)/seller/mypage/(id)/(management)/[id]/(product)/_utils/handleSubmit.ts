import { v4 as uuidv4 } from 'uuid';
import { ProductProps } from '@/types/product';
import { createClient } from '@/supabase/supabaseClient';

interface handleSubmitProps {
  state: ProductProps;
  id: string;
}
const supabase = createClient();

async function handleSubmit({ state, id }: handleSubmitProps) {
  let thumbnail_url = '';

  if (state.thumbnail) {
    const { data, error } = await supabase.storage
      .from('product-thumbnail')
      .upload(`thumbnail/${uuidv4()}`, state.thumbnail);
    if (error) {
      console.error('썸네일 업로드 중 오류 발생:', error);
      return;
    }
    const { data: thumbnailData } = supabase.storage
      .from('product-thumbnail')
      .getPublicUrl(data.path);
    thumbnail_url = thumbnailData.publicUrl;
  }

  const { error } = await supabase.from('Product').insert([
    {
      product_seller_id: id,
      product_id: uuidv4(),
      category: state.category,
      title: state.title,
      price: Number(state.price),
      stock: Number(state.stock),
      thumbnail_url: thumbnail_url,
      description: state.description,
      sale_price: state.sale_price,
      sale_starttime: state.sale_starttime,
      sale_endtime: state.sale_endtime
    }
  ]);

  if (error) {
    console.error('상품등록 중 에러발생', error);
    return;
  }
}

export default handleSubmit;
