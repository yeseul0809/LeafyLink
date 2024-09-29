export default function useEventDday(event_endtime: any, event_starttime: any) {
  const eventEndTime = new Date(event_endtime).getTime();
  const eventStartTime = new Date(event_starttime).getTime();
  const eventDday = Math.floor((eventEndTime - eventStartTime) / (1000 * 60 * 60 * 24));
  return eventDday;
}
