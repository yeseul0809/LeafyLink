'use server';

import { createClient } from '@/supabase/supabaseServer';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseServer: SupabaseClient<Database> = createClient();

// 이벤트 1개 데이터를 가져오는 함수
export async function getEventRequest(id: string) {
  const { data: event, error } = await supabaseServer
    .from('Event')
    .select('*')
    .eq('event_id', id)
    .single();
  if (error || !event) {
    console.log('해당 이벤트를 찾을 수 없습니다.', error);
    return;
  }

  return event;
}

// 이벤트 중인 리스트 데이터를 가져오는 함수
export async function getEventData() {
  const { data: eventsData, error } = await supabaseServer
    .from('Event')
    .select('*')
    .gte('event_endtime', new Date().toISOString())
    .lte('event_starttime', new Date().toISOString());
  if (error) {
    console.log('이벤트 중인 리스트 가져오는 중 에러 발생', error);
    return [];
  }
  return eventsData;
}

// 현재 할인중인 상품 목록을 가져오는 함수
export async function fetchDiscountedProducts(sellerId: string) {
  const { data: discountProducts, error } = await supabaseServer
    .from('Product')
    .select('*')
    .eq('product_seller_id', sellerId)
    .not('sale_price', 'is', null)
    .gte('sale_endtime', new Date().toISOString())
    .lte('sale_starttime', new Date().toISOString());

  if (error) {
    console.error('할인 중인 상품 가져오는 중 에러 발생', error);
    return [];
  }

  return discountProducts;
}
