import EventForm from '../_components/EventForm';

function EventEditPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[1240px] w-full">
      <h1 className="text-[32px] font-semibold pt-[80px] pb-[24px] text-center">이벤트 수정</h1>
      <EventForm />
    </div>
  );
}

export default EventEditPage;
