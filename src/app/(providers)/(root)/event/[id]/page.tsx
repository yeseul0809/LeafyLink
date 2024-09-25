import ProductDescription from '../../products/[id]/_components/Description';
import Comment from './_components/Comment';
import { getEventRequest } from './action';

interface EventPageProps {
  params: { id: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventRequest(params.id);

  if (!event) {
    return <div>이벤트 정보를 불러오는 데 오류가 발생했습니다.</div>;
  }

  return (
    <div>
      <div className="h-[42px] justify-start items-center gap-3 inline-flex">
        <div className="px-2 py-[5px] bg-[#f9f3cf] rounded-[100px] justify-start items-center gap-1 flex">
          <div className="text-[#111111] text-[11px] font-normal leading-none">
            {event.category}
          </div>
        </div>
        <div className="text-center text-[#111111] text-[32px] font-semibold leading-[42px]">
          {event.title}
        </div>
      </div>

      <br />

      <div className="h-5 justify-start items-center gap-2 inline-flex">
        <div className="text-[#555555] text-xs font-normal leading-[18px]">기간</div>
        <div className="w-px h-2.5 bg-[#e5e5ec]" />
        <div className="justify-start items-center gap-1 flex">
          <div className="text-[#3bb873] text-sm font-semibold leading-tight">D-7</div>
          <div className="text-[#111111] text-xs font-normal leading-[18px]">
            {event.event_starttime} ~ {event.event_endtime}
          </div>
        </div>
      </div>

      <div>
        <ProductDescription productDescription={event.description} />
      </div>
      <Comment eventId={event.event_id} />
    </div>
  );
}
