'use client';
import { Event } from '@/types/event';
import useEventDday from '../_actions/useEventDday';
import { useRouter } from 'next/navigation';

function EventCard({ event }: { event: Event }) {
  const dDay = useEventDday(event.event_endtime, event.event_starttime);
  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div className="w-[400px] text-center">
      <div
        className="w-full h-[300px] border-[1px] relative p-4 rounded-[20px] mb-5 cursor-pointer"
        onClick={() => {
          redirect(`${event.event_id}`);
        }}
      >
        {event.category === '증정' ? (
          <div className="w-[35px] h-[26px] absolute text-center text-[11px] text-white rounded-full bg-primary-green-500 flex items-center justify-center">
            증정
          </div>
        ) : (
          <div className="w-[35px] h-[26px] absolute text-center text-[11px] rounded-full bg-secondary-yellow-100 flex items-center justify-center">
            할인
          </div>
        )}
      </div>

      <p
        className="w-full text-[20px] font-semibold truncate mb-1 cursor-pointer"
        onClick={() => {
          redirect(`${event.event_id}`);
        }}
      >
        {event.title}
      </p>
      <p
        className="truncate text-font/sub1 text-[15px] mb-3 cursor-pointer"
        onClick={() => {
          redirect(`${event.event_id}`);
        }}
      >
        {event.summary}
      </p>
      <p className="w-full">
        <span className="pr-2 font-semibold text-primary-green-500">D-{dDay}</span>
        {new Date(event.event_starttime).toLocaleDateString()}~
        {new Date(event.event_endtime).toLocaleDateString()}
      </p>
    </div>
  );
}

export default EventCard;
