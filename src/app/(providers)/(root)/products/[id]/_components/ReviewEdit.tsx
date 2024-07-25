import useUser from '@/hooks/useUser';
import { useState } from 'react';
import { ProductReviewProps } from './ReviewList';
import { ReviewInput } from '@/types/review';
import { createReview } from '../_actions/reviewActions';

function ReviewEdit({ reviewProductId }: ProductReviewProps) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('로그인된 유저의 정보를 가져올 수 없습니다.');
      return;
    }

    const reviewData: ReviewInput = {
      description: review,
      rating: rating,
      review_product_id: reviewProductId,
      review_user_id: user.id,
      review_user_name: user.user_metadata.name
    };

    try {
      await createReview(reviewData);
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('리뷰 등록 중 에러 발생:', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">리뷰작성</h1>
      <form onSubmit={handleReviewSubmit} className="w-full mx-auto p-4 border rounded shadow-md">
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              className={`cursor-pointer text-4xl ${rating >= star ? 'text-black' : 'text-gray-400'}`}
            >
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => setRating(star)}
                className="hidden"
              />
              ★
            </label>
          ))}
        </div>
        <div className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="리뷰를 작성하세요."
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-600">
          등록하기
        </button>
      </form>
    </>
  );
}

export default ReviewEdit;
