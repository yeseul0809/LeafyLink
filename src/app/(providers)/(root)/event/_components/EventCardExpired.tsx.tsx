import React from 'react'

function EventCardExpired.tsx() {
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
            
          >
            {event.title}
          </p>
          <p
            className="truncate text-font/sub1 text-[15px] mb-3 cursor-pointer"
            
          >
            {event.summary}
          </p>
          <p className="w-full">
            <span className="pr-2 font-semibold text-font/Disabled">종료</span>
            {new Date(event.event_starttime).toLocaleDateString()}~
            {new Date(event.event_endtime).toLocaleDateString()}
          </p>
        </div>
      );
}

export default EventCardExpired.tsx