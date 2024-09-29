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
    <div className="w-[400px] text-center max_xs:w-[335px] max_xs:mx-auto">
      <div
        className="w-full h-[300px] max_xs:h-[251px] border-[1px] relative rounded-[20px] mb-5 cursor-pointer bg-center bg-cover "
        style={{ backgroundImage: `url(${event.thumbnail_url})` }}
        onClick={() => {
          redirect(`event/${event.event_id}`);
        }}
      >
        {event.category === '증정' ? (
          <div className="w-[35px] h-[26px] m-4 absolute text-center text-[11px] text-white rounded-full bg-primary-green-500 flex items-center justify-center">
            증정
          </div>
        ) : (
          <div className="w-[35px] h-[26px] m-4 absolute text-center text-[11px] rounded-full bg-secondary-yellow-100 flex items-center justify-center">
            할인
          </div>
        )}
      </div>

      <p
        className="w-full text-[20px] max_xs:text-[18px] font-semibold truncate mb-1 cursor-pointer"
        onClick={() => {
          redirect(`event/${event.event_id}`);
        }}
      >
        {event.title}
      </p>
      <p
        className="truncate text-font/sub1 text-[15px] max_xs:mb-[8px] max_xs:text-[14px] max_xs:text-[14px] mb-3 cursor-pointer"
        onClick={() => {
          redirect(`event/${event.event_id}`);
        }}
      >
        {event.summary}
      </p>
      <p className="w-full">
        <span className="pr-2 font-semibold text-primary-green-500 max_xs:text-[14px]">
          D-{dDay}
        </span>
        {new Date(event.event_starttime).toLocaleDateString()}~
        {new Date(event.event_endtime).toLocaleDateString()}
      </p>
    </div>
  );
}

export default EventCard;
