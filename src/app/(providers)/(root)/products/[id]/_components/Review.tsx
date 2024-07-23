import supabase from '@/supabase/supabaseClient';
import React, { useState } from 'react';

interface ProductReviewProps {
  review_product_id: string;
}

function ProductReview({ review_product_id }: ProductReviewProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from('Review').insert([
      {
        description: review,
        rating: rating,
        review_product_id: review_product_id,
        review_user_id: 'b64bbd7d-5a64-49ea-ac5a-d760368f02a7'
      }
    ]);

    if (error) {
      console.error('리뷰 데이터 삽입 중 에러발생', error);
    } else {
      console.log('리뷰 데이터 삽입성공', data);
      setRating(0);
      setReview('');
    }
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <input
              type="radio"
              name="star"
              value={star}
              onChange={() => setRating(star)}
              checked={rating === star}
            />
            {star} ★
          </label>
        ))}
      </div>
      <div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="리뷰를 작성하세요."
          required
        />
      </div>
      <button type="submit">등록하기</button>
    </form>
  );
}

export default ProductReview;
