import supabase from "@/supabase/supabaseClient"
import { v4 as uuidv4 } from 'uuid';
import { ProductState } from "../types/product"
import { INITIAL_STATE } from "./constants";

interface handleSubmitProps{
    state:ProductState;
    setState: React.Dispatch<React.SetStateAction<ProductState>>;
}

async function handleSubmit({state, setState}:handleSubmitProps) {
    let thumbnail_url=""
    
    if (state.thumbnail) {
        const { data, error } = await supabase.storage
          .from('product-thumbnail')
          .upload(`thumbnail/${uuidv4()}`, state.thumbnail);
        if (error) {
          console.error('썸네일 업로드 중 오류 발생:', error);
          return;
        }
        const { data: thumbnailData } = supabase.storage.from('product-thumbnail').getPublicUrl(data.path);
        thumbnail_url = thumbnailData.publicUrl;
      }

    const {error} = await supabase.from('Product').insert([{
        category:state.category,
        title:state.name,
        price: Number(state.price), 
        stock: Number(state.stock), 
        thumbnail_url: thumbnail_url
    }])

    if(error) {
        console.error("상품등록 중 에러발생", error);
        return
    }
    setState(INITIAL_STATE);
}

export default handleSubmit