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
    console.log('해당 이벤트를 찾을 수 없습니다.', error);
    return;
  }

  return event;
}
