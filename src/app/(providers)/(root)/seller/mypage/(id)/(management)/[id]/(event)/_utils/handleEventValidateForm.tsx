import { Event } from '@/types/event';

export function handleEventValidateForm(state: Event | null): boolean {
  return !!state?.category && !!state?.title && !!state?.description;
}
