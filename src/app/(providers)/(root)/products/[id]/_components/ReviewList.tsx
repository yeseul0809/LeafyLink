'use client';

import { Review } from '@/types/review';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteReview, getReviews } from '../_actions/productActions';
import ReviewToggle from './ReviewToggle';
import { formatDateTime } from '../utils/formatDateTime';
import showSwal, { showSwalDeleteReview } from '@/utils/swal';
import useUser from '@/hooks/useUser';

interface ProductReviewProps {
  productId: string;
  reviewsPerPage: number;
}

const fetchReviews = async (productId: string, reviewsPerPage: number, currentPage: number) => {
  const offset = (currentPage - 1) * reviewsPerPage;
  return getReviews(productId, reviewsPerPage, offset);
};

const ProductReviewList = ({ productId, reviewsPerPage }: ProductReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: reviewData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['reviews', productId, currentPage],
    queryFn: () => fetchReviews(productId, reviewsPerPage, currentPage)
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  // 리뷰삭제
  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      showSwal('리뷰가 삭제되었습니다.');
    },
    onError: (error: any) => {
      console.error('리뷰 삭제 중 에러 발생:', error);
      showSwal('리뷰 삭제를 실패했습니다.');
    }
  });

  const handleDeleteReview = async (reviewId: string) => {
    const isConfirmed = await showSwalDeleteReview();
    if (isConfirmed) {
      deleteMutation.mutate(reviewId);
    }
  };

  const totalPages = reviewData ? Math.ceil((reviewData.totalCount ?? 0) / reviewsPerPage) : 1;

  return (
    <div className="w-[335px] md:w-[1240px] mx-auto">
      {isLoading ? (
        <p>리뷰를 불러오는 중입니다...</p>
      ) : error ? (
        <p>리뷰를 불러오는 중 에러가 발생했습니다: {error.message}</p>
      ) : reviewData?.reviews.length === 0 ? (
        <p className="flex justify-center text-[15px] pt-12 pb-[164px]">리뷰가 아직 없습니다.</p>
      ) : (
        <>
          <ul className="text-left">
            {reviewData?.reviews.map((review: Review) => (
              <li key={review.review_id} className="pt-5 md:pt-12 pb-5 md:pb-10 border-b rounded">
                <div className="mb-2">
                  <p className="text-[13px]">{review.review_user_name}</p>
                </div>
                <div className="flex items-center pb-[17px] md:pb-6">
                  {Array.from({ length: review.rating || 0 }).map((_, index) => (
                    <span key={index} className="text-[16px] md:text-[24px] text-primary-green-500">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - (review.rating || 0) }).map((_, index) => (
                    <span key={index} className="text-gray-300">
                      ★
                    </span>
                  ))}
                  <span className="text-[13px] md:text-xl font-bold ml-2">{review.rating}.0</span>
                </div>
                <ReviewToggle description={review.description} />
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">
                    {review.created_at ? formatDateTime(review.created_at) : '날짜 정보 없음'}
                  </span>
                  {user?.id === review.review_user_id && (
                    <button
                      onClick={() => handleDeleteReview(review.review_id)}
                      className="text-font/sub1 hover:text-red-500 font-semibold text-[13px]"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center mt-10 mb-[70px] md:mb-0 md:mt-20">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 mx-[6px] px-3 py-1 rounded-full ${currentPage === index + 1 ? 'border border-Line/Strong' : 'bg-white'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReviewList;
