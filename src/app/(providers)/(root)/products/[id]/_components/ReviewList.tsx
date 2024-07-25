import { getReviews } from '../_actions/productActions';

export interface ProductReviewProps {
  reviewProductId: string;
}

const ProductReviewList: React.FC<ProductReviewProps> = async ({ reviewProductId }) => {
  const reviews = await getReviews(reviewProductId);

  if (!reviews) {
    return <p>리뷰가 없습니다.</p>;
  }

  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">리뷰 목록</h2>
      <ul className="space-y-4 text-left">
        {reviews.map((review) => (
          <li key={review.review_id} className="p-4 border rounded shadow-md">
            <div className="mb-2">
              <p className="font-bold">작성자: {review.review_user_name}</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {Array.from({ length: review.rating || 0 }).map((_, index) => (
                  <span key={index} className="text-black">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - (review.rating || 0) }).map((_, index) => (
                  <span key={index} className="text-gray-300">
                    ★
                  </span>
                ))}
                <span className="text-xl font-bold ml-2">{review.rating}.0</span>
              </div>
            </div>
            <p className="mb-2">{review.description}</p>
            <span className="text-gray-500 text-sm">
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString()
                : '날짜 정보 없음'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReviewList;
