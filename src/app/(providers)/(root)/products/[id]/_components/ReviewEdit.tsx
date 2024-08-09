'use client';

import useUser from '@/hooks/useUser';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Review, ReviewInput } from '@/types/review';
import { createReview, getReviews } from '../_actions/productActions';
import StarRating from './StarRating';
import showSwal from '@/utils/swal';
import { useRouter } from 'next/navigation';
import { useBottomTabStore } from '@/stores/bottomTab';

interface ReviewEditProps {
  reviewProductId: string;
  reviewCount: number;
}

function ReviewEdit({ reviewProductId, reviewCount }: ReviewEditProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const setShowBottomTab = useBottomTabStore((state) => state.setShowBottomTab);
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
    <div className="grid px-5 xs:px-0 xs:flex">
      <h2 className="text-[20px] md:text-[32px] mt-6 mb-4 md:mt-0 md:mb-8">리뷰</h2>
      <p className="text-[14px] md:text-[18px] pb-2 md:pb-5 text-left">리뷰 {reviewCount}</p>
      <form
        onSubmit={handleReviewSubmit}
        className="w-full mx-auto pt-5 md:pt-12 md:pb-10 border-Line/Regular border-t border-b rounded"
      >
        <StarRating rating={rating} setRating={setRating} />
        <div className="mb-4 md:mb-5">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="소중한 리뷰를 작성해주세요."
            required
            onFocus={() => setShowBottomTab(false)}
            onBlur={() => setShowBottomTab(true)}
            className="w-full h-20 md:h-40 p-[12px] md:p-5 border-2 rounded overflow-y-auto custom-scrollbar placeholder:text-[12px] md:placeholder:text-base"
          />
        </div>
        <div className="flex-col md:flex-row md:flex justify-between gap-4">
          <div className="flex flex-col text-[11px] md:text-[14px] text-left">
            <span>
              • 상품과 관련없는 내용 또는 이미지, 욕설/비방, 개인정보유출, 광고/홍보글 등 적절하지
              않은 게시물은 별도의 고지없이 비공개 처리 될 수 있습니다.
            </span>
            <span>• 작성된 게시물은 운영 및 마케팅에 활용될 수 있습니다.</span>
          </div>
          <button
            type="submit"
            className="w-[163px] md:w-[82px] bg-primary-green-500 mt-3 mb-5 md:mt-0 md:mb-0 text-[13px] text-white px-3 py-[9px] rounded-[4px] hover:bg-primary-green-700"
          >
            리뷰남기기
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewEdit;
