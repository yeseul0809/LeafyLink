import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/supabase/supabaseClient';
import { EventProps } from '@/types/event';

interface handleEventSubmitProps {
  state: EventProps;
  id: string;
}

const supabase = createClient();

async function handleEventSubmit({ state, id }: handleEventSubmitProps) {
  let thumbnail_url = '';

  if (state.eventThumbnail) {
    const { data, error } = await supabase.storage
      .from('event-thumbnail')
      .upload(`thumbnail/${uuidv4()}`, state.eventThumbnail);
    if (error) {
      console.error('이벤트 썸네일 업로드 중 오류 발생:', error);
      return;
    }
    const { data: eventThumbnailData } = supabase.storage
      .from('event-thumbnail')
      .getPublicUrl(data.path);
    thumbnail_url = eventThumbnailData.publicUrl;
  }

  const { error } = await supabase.from('Event').insert([
    {
      category: state.category,
      description: state.description,
      event_endtime: state.event_endtime,
      event_starttime: state.event_starttime,
      related_products: null,
      seller_id: id,
      summary: state.summary,
      thumbnail_url: thumbnail_url,
      title: state.title
    }
  ]);

  if (error) {
    console.error('이벤트등록 중 에러발생', error);
    return;
  }
}

export default handleEventSubmit;
