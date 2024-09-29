'use client';
import React, { useEffect, useState } from 'react';
import EventCard from './_components/EventCard';
import { getEventData, getEventExpiredData } from './_actions/eventActions';
import EventCardExpired from './_components/EventCardExpired.tsx';
import Pagination from '../buyer/mypage/_components/Pagination';
import showSwal from '@/utils/swal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Event } from '@/types/event';

function EventPage() {
  const [eventsData, setEventsData] = useState<Event>();
  const [eventExpiredData, setEventExpiredData] = useState<Event>();
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsData = await getEventData();
        const eventExpiredData = await getEventExpiredData();
        setEventsData(eventsData);
        setEventExpiredData(eventExpiredData);
      } catch {
        showSwal('이벤트를 불러오지 못했습니다. 다시 시도해주세요.');
        window.location.reload();
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, []);

  // 로딩 중 일때
  if (loading) {
    return (
      <section className="h-auto m-auto lg:mt-[80px] lg:mb-[180px]">
        <Image src="/loading.gif" alt="로딩이미지" width={200} height={100} className="mx-auto" />
      </section>
    );
  }

  return (
    <section className="h-auto mx-auto lg:mt-[80px] lg:mb-[180px]">
      <h2 className="text-[32px] text-center lg:mb-[48px]  max_md:text-[20px] max_md:mt-6 max_md:mb-4 font-semibold">
        이벤트
      </h2>
      <div className="grid grid-cols-3 gap-y-10 gap-x-5 max_xs:grid-cols-1 ">
        {eventsData
          ? eventsData.map((event: Event) => {
              return <EventCard key={event.event_id} event={event} />;
            })
          : null}
        {eventExpiredData
          ? eventExpiredData.map((expiredEvent: Event) => {
              return <EventCardExpired key={expiredEvent.event_id} expiredEvent={expiredEvent} />;
            })
          : null}
      </div>
      {/* <Pagination
        totalItems={totalItems}
        itemCountPerPag={itemCountPerPage}
        pageCount={pageCount}
        currentPage={currentPage}
      /> */}
    </section>
  );
}

export default EventPage;
