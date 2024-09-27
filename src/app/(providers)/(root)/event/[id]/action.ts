'use server';
import { createClient } from '@/supabase/supabaseServer';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { Comment } from './types';

export async function getEventRequest(id: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data: event, error } = await supabaseServer
    .from('Event')
    .select('*')
    .eq('event_id', id)
    .single();

  if (error || !event) {
    console.error('해당 이벤트를 찾을 수 없습니다.', error);
    return null;
  }

  return event;
}

export async function getCommentsByEventId(
  eventId: string
): Promise<Comment[] | { error: boolean; message: string }> {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data: comments, error } = await supabaseServer
    .from('Comment')
    .select(
      `
    comment_event_id,
    comment_id,
    comment_user_id,
    created_at,
    description,
    User:comment_user_id (user_name)
  `
    )
    .eq('comment_event_id', eventId);
  console.log(comments);

  if (error) {
    console.error('댓글을 불러오는 데 오류가 발생했습니다:', error);
    return { error: true, message: error.message };
  }

  return (comments as any) || [];
}

//댓글 추가
export async function addComment(eventId: string, userId: string, description: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();

  const { data, error } = await supabaseServer
    .from('Comment')
    .insert([
      {
        comment_event_id: eventId,
        comment_user_id: userId,
        description: description
      }
    ])
    .select();

  if (error) {
    console.error('댓글을 추가하는 데 오류가 발생했습니다:', error);
    return null;
  }

  console.log('댓굴:', data);
  return data;
}
//댓글삭제
export async function deleteComment(commentId: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();

  const { data, error } = await supabaseServer.from('Comment').delete().eq('comment_id', commentId);

  if (error) {
    console.error('댓글 삭제에 실패했습니다:', error);
    return null;
  }

  console.log('삭제된 댓글:', data);
  return data;
}

//댓글수정
export async function updateComment(commentId: string, description: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data, error } = await supabaseServer
    .from('Comment')
    .update({ description })
    .eq('comment_id', commentId)
    .select();

  if (error) {
    console.error('댓글 수정에 실패했습니다:', error);
    return null;
  }

  console.log('수정된 댓글:', data);
  return data;
}

export async function getRelatedProducts(eventId: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();

  // Event 테이블에서 seller_id 가져오기
  const { data: eventData, error: eventError } = await supabaseServer
    .from('Event')
    .select('seller_id, related_products')
    .eq('event_id', eventId)
    .single();

  if (eventError) {
    console.error('이벤트 정보를 가져오는 데 오류가 발생했습니다:', eventError);
    return null;
  }

  const sellerId = eventData.seller_id;
  const relatedProducts = eventData.related_products;

  // relatedProducts가 null이 아닐 때만 products 테이블에서 가져오기
  if (!relatedProducts) {
    console.warn('관련 제품이 없습니다.');
    return [];
  }

  // relatedProducts를 string 배열로 변환
  const productTitles = Array.isArray(relatedProducts) ? relatedProducts : [relatedProducts];

  // sellerId와 관련된 제품 가져오기
  const { data: productsData, error: productsError } = await supabaseServer
    .from('Product')
    .select('*')
    .in('title', productTitles)
    .eq('product_seller_id', sellerId); // seller_id로 필터링

  if (productsError) {
    console.error('제품 정보를 가져오는 데 오류가 발생했습니다:', productsError);
    return null;
  }

  return productsData;
}
