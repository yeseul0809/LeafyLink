import React from 'react';
import EventCard from './_components/EventCard';

async function Event() {
  return (
    <section className="h-auto mx-auto lg:mt-[80px] lg:mb-[180px] ">
      <h2 className="text-[32px] text-center lg:mb-[48px] max_md:text-[20px] max_md:mt-6 max_md:mb-4 font-semibold">
        이벤트
      </h2>
      <div className="grid grid-cols-3 gap-5 ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </section>
  );
}

export default Event;
