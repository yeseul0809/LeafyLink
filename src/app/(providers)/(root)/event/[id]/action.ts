'use server';
import { createClient } from '@/supabase/supabaseServer';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

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

export async function getCommentsByEventId(eventId: string) {
  const supabaseServer: SupabaseClient<Database> = createClient();
  const { data: comments, error } = await supabaseServer
    .from('Comment')
    .select(
      `
      *,
      User:comment_user_id (
        user_name
      )
    `
    )
    .eq('comment_event_id', eventId);

  if (error) {
    console.error('댓글을 불러오는 데 오류가 발생했습니다:', error);
    return [];
  }
  console.log(comments);
  return comments;
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
