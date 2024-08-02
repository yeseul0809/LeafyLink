'use client';

interface ActiveTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleScrollToReview: () => void;
}

function ActiveTab({ activeTab, setActiveTab, handleScrollToReview }: ActiveTabProps) {
  return (
    <nav className="flex justify-center mt-[80px] mb-10 font-bold text-[22px]">
      <button
        onClick={() => {
          setActiveTab('description');
        }}
        className={`w-full border-b-2 py-3 text-[18px] ${
          activeTab === 'description'
            ? 'border-primary-green-500 text-primary-green-500'
            : 'border-gray-200'
        }`}
      >
        제품상세
      </button>
      <button
        onClick={() => {
          setActiveTab('reviews');
          handleScrollToReview();
        }}
        className={`w-full border-b-2 py-3 text-[18px] ${
          activeTab === 'reviews'
            ? 'border-primary-green-500 text-primary-green-500'
            : 'border-gray-200'
        }`}
      >
        리뷰
      </button>
    </nav>
  );
}

export default ActiveTab;
