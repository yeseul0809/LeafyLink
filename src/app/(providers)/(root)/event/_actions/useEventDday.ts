export default async function useEventDday(event_endtime: String, event_starttime: String) {
  const eventEndTime = new Date(event_endtime).getTime();
  const eventStartTime = new Date(event_starttime).getTime();
  const eventDday = Math.floor((eventEndTime - eventStartTime) / (1000 * 60 * 60 * 24));
  return eventDday;
}
