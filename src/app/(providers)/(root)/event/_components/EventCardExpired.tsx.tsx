import { Event } from '@/types/event';
import React from 'react';

function EventCardExpired({ expiredEvent }: { expiredEvent: Event }) {
  return (
    <div className="w-[400px] text-center max_xs:w-[335px] max_xs:mx-auto">
      <div
        className="w-full h-[300px] max_xs:h-[251px] border-[1px] relative rounded-[20px] mb-5 bg-center bg-cover"
        style={{ backgroundImage: `url(${expiredEvent.thumbnail_url})` }}
      >
        <div className="w-full h-full bg-black opacity-60 rounded-[20px]">
          <p className="h-full text-[28px] max_xs:text-[24px] text-white font-semibold text-center flex justify-center items-center">
            이미 종료된 이벤트입니다.
          </p>
        </div>
      </div>

      <p className="w-full text-[20px] max_xs:text-[18px] font-semibold truncate mb-1 ">
        {expiredEvent.title}
      </p>
      <p className="truncate text-font/sub1 text-[15px] max_xs:text-[14px] mb-3 max_xs:mb-[8px]">
        {expiredEvent.summary}
      </p>
      <p className="w-full max_xs:text-[14px]">
        <span className="pr-2 font-semibold text-font/Disabled">종료</span>
        {new Date(expiredEvent.event_starttime).toLocaleDateString()}~
        {new Date(expiredEvent.event_endtime).toLocaleDateString()}
      </p>
    </div>
  );
}

export default EventCardExpired;
