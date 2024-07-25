'use client';

interface ActiveTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleScrollToReview: () => void;
}

function ActiveTab({ activeTab, setActiveTab, handleScrollToReview }: ActiveTabProps) {
  return (
    <nav className="flex justify-center gap-3 mb-8">
      <button
        onClick={() => {
          setActiveTab('description');
        }}
        className={`border-b-2 ${activeTab === 'description' ? 'border-b-black' : 'border-b-gray-200'}`}
      >
        제품상세
      </button>
      <button
        onClick={() => {
          setActiveTab('reviews');
          handleScrollToReview();
        }}
        className={`border-b-2 ${activeTab === 'reviews' ? 'border-b-black' : 'border-b-gray-200'}`}
      >
        리뷰
      </button>
    </nav>
  );
}

export default ActiveTab;
