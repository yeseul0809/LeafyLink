import React from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
}

function StarRating({ rating, setRating }: StarRatingProps) {
  return (
    <div className="flex justify-center mb-3 md:mb-8">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;
        const isActive = rating >= star;
        const starClass = `cursor-pointer text-[32px] md:text-4xl ml-1 ${isActive ? 'text-primary-green-500' : 'text-BG/Regular'}`;
        return (
          <label key={star} className={starClass} htmlFor={`rating-${star}`}>
            <input
              type="radio"
              id={`rating-${star}`}
              name="rating"
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
