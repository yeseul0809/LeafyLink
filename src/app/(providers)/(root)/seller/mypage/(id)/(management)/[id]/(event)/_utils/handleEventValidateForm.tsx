import { Event } from '@/types/event';

export function handleEventValidateForm(state: Event | null): boolean {
  return (
    !!state?.category &&
    !!state?.title &&
    !!state?.description &&
    !!state.event_starttime &&
    !!state.event_endtime &&
    !!state.thumbnail_url &&
    !!state?.summary
  );
}
