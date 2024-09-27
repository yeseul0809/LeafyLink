'use client';
import { useState, useEffect } from 'react';
import { getEvents } from '../action';

type Event = {
  event_id: string;
  seller_id: string;
  title: string;
  event_starttime: string;
  event_endtime: string;
  category: string;
};

interface EventsProps {
  sellerId: string;
}

export default function Events({ sellerId }: EventsProps) {
  const [events, setEvents] = useState<Event[]>([]);

  // 이벤트 데이터를 가져오는 함수
  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEvents(sellerId);
        setEvents(data || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, [sellerId]);

  return (
    <div className="w-[1240px] h-[696px] flex-col justify-start items-start inline-flex">
      <div className="self-stretch justify-start items-start inline-flex">
        <div className="grow shrink basis-0 h-14 p-4 bg-[#f9f3cf] justify-center items-center gap-2.5 flex">
          <div className="grow shrink basis-0 text-center text-[#111111] text-base font-normal leading-normal">
            이벤트
          </div>
        </div>
        <div className="w-[157px] h-14 p-4 bg-[#f9f3cf] justify-center items-center gap-2.5 flex">
          <div className="grow shrink basis-0 text-center text-[#111111] text-base font-normal leading-normal">
            기간
          </div>
        </div>
        <div className="w-[130px] h-14 p-4 bg-[#f9f3cf] justify-center items-center gap-2.5 flex">
          <div className="grow shrink basis-0 text-center text-[#111111] text-base font-normal leading-normal">
            종류
          </div>
        </div>
        <div className="w-[130px] h-14 p-4 bg-[#f9f3cf] justify-center items-center gap-2.5 flex">
          <div className="grow shrink basis-0 text-center text-[#111111] text-base font-normal leading-normal">
            수정
          </div>
        </div>
      </div>

      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.event_id}
            className="self-stretch border-b border-[#f1f1f5] justify-start items-start inline-flex"
          >
            <div className="grow shrink basis-0 h-16 px-4 py-[22px] bg-white justify-start items-center gap-2.5 flex">
              <div className="grow shrink basis-0 text-[#111111] text-sm font-normal leading-tight">
                {event.title}
              </div>
            </div>
            <div className="w-[157px] h-16 px-4 py-[22px] bg-white justify-center items-center gap-2.5 flex">
              <div className="w-[125px] text-center text-[#767676] text-sm font-normal leading-tight">
                {event.event_starttime} - {event.event_endtime}
              </div>
            </div>
            <div className="w-[130px] h-16 px-4 py-[22px] bg-white justify-center items-center gap-2.5 flex">
              <div className="grow shrink basis-0 text-center text-[#3bb873] text-sm font-normal leading-tight">
                {event.category}
              </div>
            </div>
            <div className="w-[130px] h-16 px-4 py-[22px] bg-white justify-center items-center gap-2.5 flex">
              <div className="px-3 py-[9px] bg-white rounded border border-[#3bb873] justify-center items-center gap-2.5 flex">
                <div className="text-center text-[#3bb873] text-[13px] font-normal leading-[18px]">
                  이벤트 수정
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="self-stretch py-4 text-center text-[#767676] text-sm">
          등록된 이벤트가 없습니다.
        </div>
      )}
    </div>
  );
}
