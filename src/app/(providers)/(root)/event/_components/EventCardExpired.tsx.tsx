'use client';
import { Event } from '@/types/event';
import React from 'react';

function EventCardExpired({ expiredEvent }: { expiredEvent: Event }) {
  return (
    <div className="w-[400px] text-center">
      <div
        className="w-full h-[300px] border-[1px] relative rounded-[20px] mb-5 bg-center bg-cover"
        style={{ backgroundImage: `url(${expiredEvent.thumbnail_url})` }}
      >
        <div className='"w-full h-full bg-black opacity-60 rounded-[20px]'>
          <p className="h-full text-[28px] text-white font-semibold text-center flex justify-center items-center">
            이미 종료된 이벤트입니다.
          </p>
        </div>
      </div>

      <p className="w-full text-[20px] font-semibold truncate mb-1 ">{expiredEvent.title}</p>
      <p className="truncate text-font/sub1 text-[15px] mb-3 ">{expiredEvent.summary}</p>
      <p className="w-full">
        <span className="pr-2 font-semibold text-font/Disabled">종료</span>
        {new Date(expiredEvent.event_starttime).toLocaleDateString()}~
        {new Date(expiredEvent.event_endtime).toLocaleDateString()}
      </p>
    </div>
  );
}

export default EventCardExpired;
