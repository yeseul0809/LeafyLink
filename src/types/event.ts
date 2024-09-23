import { Tables } from './supabase';

export type Event = Tables<'Event'>;

export interface EventProps extends Event {
  eventThumbnail?: File | null;
}
