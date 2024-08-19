interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
  uniqueId: string; // unique id를 추가
}

function StarRating({ rating, setRating, uniqueId }: StarRatingProps) {
  return (
    <div className="flex justify-center mb-3 md:mb-8">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;
        const isActive = rating >= star;
        const starClass = `cursor-pointer text-[32px] md:text-4xl ml-1 ${
          isActive ? 'text-primary-green-500' : 'text-BG/Regular'
        }`;
        return (
          <label
            key={star}
            className={starClass}
            htmlFor={`rating-${uniqueId}-${star}`} // id를 고유하게 설정
          >
            <input
              type="radio"
              id={`rating-${uniqueId}-${star}`}
              name={`rating-${uniqueId}`}
              value={star}
              onChange={() => setRating(star)}
              className="hidden"
            />
            ★
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
