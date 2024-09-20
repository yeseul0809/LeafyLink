'use client';
import React, { useState } from 'react';

function EventCard() {
  const [eventType, setEventType] = useState('gift');
  return (
    <div className="w-[400px] text-center ">
      <div className="w-full h-[300px] border-[1px] relative p-4 rounded-[20px] mb-5 cursor-pointer">
        {eventType === 'gift' ? (
          <div className="w-[35px] h-[26px] absolute text-center text-[11px] text-white rounded-full bg-primary-green-500 flex items-center justify-center">
            증정
          </div>
        ) : (
          <div className="w-[35px] h-[26px] absolute text-center text-[11px] rounded-full bg-secondary-yellow-100 flex items-center justify-center">
            할인
          </div>
        )}
      </div>

      <p className="w-full text-[20px] font-semibold truncate mb-1 cursor-pointer">이벤트 타이틀</p>
      <p className="truncate text-font/sub1 text-[15px] mb-3 cursor-pointer">
        이벤트 설명 설명 설며어어어어어어어엉이야이야이야ㅣ야이야ㅣ야이ㅑ이이야이ㅑㅇ
      </p>
      <p className="w-full">
        <span className="pr-2 font-semibold text-primary-green-500">D-</span>24.09.16~24.09.16
      </p>
    </div>
  );
}

export default EventCard;
