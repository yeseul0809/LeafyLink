import Link from 'next/link';
import ProductDescription from '../../products/[id]/_components/Description';
import Comment from './_components/Comment';
import { getEventRequest } from './action';
// import SaleProduct from './_components/SaleProduct';

interface EventPageProps {
  params: { id: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventRequest(params.id);

  if (!event) {
    return <div>이벤트 정보를 불러오는 데 오류가 발생했습니다.</div>;
  }

  return (
    <div className="mt-[80px]">
      <div className="flex flex-col items-center">
        <div className="h-[42px] justify-center items-center gap-3 inline-flex">
          {event.category === '할인' ? (
            <div className="h-[26px] px-2 py-[5px] bg-[#3bb873] rounded-[100px] justify-start items-center gap-1 inline-flex">
              <div className="text-white text-[11px] font-normal leading-none">할인</div>
            </div>
          ) : (
            <div className="h-[26px] px-2 py-[5px] bg-[#f9f3cf] rounded-[100px] justify-start items-center gap-1 inline-flex">
              <div className="text-[#111111] text-[11px] font-normal leading-none">증정</div>
            </div>
          )}

          <div className="text-center text-[#111111] text-[32px] font-semibold leading-[42px]">
            {event.title}
          </div>
        </div>

        <br />

        <div className="h-5 justify-center items-center gap-2 inline-flex">
          <div className="text-[#555555] text-xs font-normal leading-[18px]">기간</div>
          <div className="w-px h-2.5 bg-[#e5e5ec]" />
          <div className="justify-start items-center gap-1 flex">
            <div className="text-[#3bb873] text-sm font-semibold leading-tight">D-7</div>
            <div className="text-[#111111] text-xs font-normal leading-[18px]">
              {event.event_starttime} ~ {event.event_endtime}
            </div>
          </div>
        </div>
      </div>

      <ProductDescription productDescription={event.description} />

      {event.category !== '할인' && <Comment eventId={event.event_id} />}

      {/* {event.category !== '증정' && <SaleProduct eventId={event.event_id} />} */}
      <div className="flex flex-col items-center mb-[180px] mt-[48px]">
        <Link href="/event">
          <div className="h-14 p-4 bg-white rounded-md border border-[#777777] justify-center items-center gap-2.5 inline-flex cursor-pointer">
            <div className="justify-center items-center gap-1 flex">
              <div className="text-center text-[#777777] text-base font-semibold leading-normal">
                이벤트 목록 가기
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
