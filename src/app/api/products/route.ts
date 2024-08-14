import { Product } from '@/types/product';
import { createClient } from '@/supabase/supabaseServer';
import { NextResponse } from 'next/server';
export async function GET() {
  console.log('진입2');
  const supabase = createClient();
  try {
    const { data: product, error } = await supabase.from('Product').select('*');
    if (error) {
      console.error(error);
      throw new Error('상품을 불러올 수 없습니다.');
    }
    console.log('========supabase product======', product);
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ eror: e.message });
    } else {
      NextResponse.json({ error: '알 수 없는 에러가 발생했습니다' }, { status: 500 });
    }
  }
}
export async function POST() {}
