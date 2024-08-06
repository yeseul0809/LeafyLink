'use client';

import useUser from '@/hooks/useUser';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Review, ReviewInput } from '@/types/review';
import { createReview, getReviews } from '../_actions/productActions';
import StarRating from './StarRating';
import showSwal from '@/utils/swal';
import { useRouter } from 'next/navigation';

interface ReviewEditProps {
  reviewProductId: string;
  reviewCount: number;
}

function ReviewEdit({ reviewProductId, reviewCount }: ReviewEditProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const router = useRouter();

  const mutation = useMutation<Review[], Error, ReviewInput>({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', reviewProductId] });
      setRating(0);
      setReview('');
    },
    onError: (error: any) => {
      console.error('리뷰 등록 중 에러 발생:', error);
    }
  });

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push('/login');
      return;
    }

    const reviewData: ReviewInput = {
      description: review,
      rating: rating,
      review_product_id: reviewProductId,
      review_user_id: user.id,
      review_user_name: user.user_metadata.name
    };

    mutation.mutate(reviewData);
  };

  return (
    <>
      <h2 className="text-[32px] mb-8">리뷰</h2>
      <p className="text-[18px] pb-5 text-left">리뷰 {reviewCount}</p>
      <form
        onSubmit={handleReviewSubmit}
        className="w-full mx-auto pt-12 pb-10 border-Line/Regular border-t border-b rounded"
      >
        <StarRating rating={rating} setRating={setRating} />
        <div className="mb-5">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="소중한 리뷰를 작성해주세요."
            required
            className="w-full h-40 p-5 border-2 rounded overflow-y-auto custom-scrollbar"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col text-[14px] text-left">
            <span>
              • 상품과 관련없는 내용 또는 이미지, 욕설/비방, 개인정보유출, 광고/홍보글 등 적절하지
              않은 게시물은 별도의 고지없이 비공개 처리 될 수 있습니다.
            </span>
            <span>• 작성된 게시물은 운영 및 마케팅에 활용될 수 있습니다.</span>
          </div>
          <button
            type="submit"
            className="bg-primary-green-500 text-white px-3 py-[9px] rounded-[4px] hover:bg-primary-green-700"
          >
            리뷰남기기
          </button>
        </div>
      </form>
    </>
  );
}

export default ReviewEdit;
