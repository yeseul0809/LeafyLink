import supabase from "@/supabase/supabaseClient";


export const getProductById = async (id: string) => {
    const {data, error} = await supabase.from('Product').select('*').eq('product_id', id).single();
    if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
      return data;
} 
