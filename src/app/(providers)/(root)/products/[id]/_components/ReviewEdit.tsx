'use client';

import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Review, ReviewInput } from '@/types/review';
import { createReview, getUserPurchasedProducts, updateReview } from '../_actions/productActions';
import StarRating from './StarRating';
import showSwal from '@/utils/swal';
import { useRouter } from 'next/navigation';
import { useBottomTabStore } from '@/stores/bottomTab';
import useGetUser from '@/hooks/user/useUser';

interface ReviewEditProps {
  reviewProductId: string;
  reviewCount: number;
  editingReview?: ReviewInput | null;
  handleEditReview: (review: ReviewInput) => void;
}

function ReviewEdit({
  reviewProductId,
  reviewCount,
  editingReview,
  handleEditReview
}: ReviewEditProps) {
  const { userData } = useGetUser();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(editingReview?.rating || 0);
  const [review, setReview] = useState<string>(editingReview?.description || '');
  const [availableReview, setAvailableReview] = useState<boolean>(false);
  const setShowBottomTab = useBottomTabStore((state) => state.setShowBottomTab);
  const router = useRouter();

  useEffect(() => {
    const checkUserPurchase = async () => {
      if (userData) {
        const purchaseData = await getUserPurchasedProducts(userData.user_id, reviewProductId);
        setAvailableReview(!!(purchaseData && purchaseData.length > 0));
      }
    };
    checkUserPurchase();
  }, [userData, reviewProductId]);

  // 리뷰작성
  const createMutation = useMutation<Review[], Error, ReviewInput>({
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

  // 리뷰수정
  const updateMutation = useMutation<Review[], Error, ReviewInput>({
    mutationFn: (reviewData: ReviewInput) => updateReview(reviewData, editingReview?.review_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', reviewProductId] });
    },
    onError: (error: any) => {
      console.error('리뷰 수정 중 에러 발생:', error);
    }
  });

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData) {
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push('/login');
      return;
    }

    if (!availableReview) {
      showSwal('해당 상품에 대한 구매 내역이 없어<br> 리뷰를 작성할 수 없습니다.');
      return;
    }

    const reviewData: ReviewInput = {
      description: review,
      rating: rating,
      review_product_id: reviewProductId,
      review_user_id: userData.user_id,
      review_user_name: userData.user_name
    };

    if (editingReview) {
      updateMutation.mutate(reviewData);
      handleEditReview(reviewData);
    } else {
      createMutation.mutate(reviewData);
    }
  };

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating || 0);
      setReview(editingReview.description);
    }
  }, [editingReview]);

  return (
    <div className="grid px-5 xs:px-0 xs:flex">
      {!editingReview && (
        <>
          <h2 className="text-[20px] md:text-[32px] mt-6 mb-4 md:mt-0 md:mb-8">리뷰</h2>
          <p className="text-[14px] md:text-[18px] pb-2 md:pb-5 text-left">리뷰 {reviewCount}</p>
        </>
      )}
      <form
        onSubmit={handleReviewSubmit}
        className={`w-full mx-auto pt-5 md:pt-12 md:pb-10 border-t border-b rounded 
          ${editingReview ? 'border-primary-green-500 border-l border-r px-[12px] md:pt-[12px]' : 'border-Line/Regular'}`}
      >
        <StarRating
          rating={rating}
          setRating={setRating}
          uniqueId={`edit-${editingReview?.review_id}`}
        />
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
            {editingReview ? '수정하기' : '리뷰남기기'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewEdit;
