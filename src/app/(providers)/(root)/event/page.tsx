import React from 'react';
import EventCard from './_components/EventCard';
import { getEventData, getEventExpiredData } from './_actions/eventActions';
import EventCardExpired from './_components/EventCardExpired.tsx';

async function Event() {
  const eventsData = await getEventData();
  const eventExpiredData = await getEventExpiredData();

  return (
    <section className="h-auto mx-auto lg:mt-[80px] lg:mb-[180px] ">
      <h2 className="text-[32px] text-center lg:mb-[48px] max_md:text-[20px] max_md:mt-6 max_md:mb-4 font-semibold">
        이벤트
      </h2>
      <div className="grid grid-cols-3 gap-y-10 gap-x-5">
        {eventsData.map((event) => {
          return <EventCard key={event.event_id} event={event} />;
        })}
        {eventExpiredData.map((expiredEvent) => {
          return <EventCardExpired key={expiredEvent.event_id} expiredEvent={expiredEvent} />;
        })}
      </div>
    </section>
  );
}

export default Event;
