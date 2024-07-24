import { ProductReviewProps } from "@/app/(providers)/(root)/products/[id]/_components/ReviewList";
import supabase from "@/supabase/supabaseClient";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

function useProductReviews({reviewProductId} : ProductReviewProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviewList = async () => {
        const { data, error } = await supabase.from('Review').select('*').eq('review_product_id', reviewProductId);

        if (error) {
            console.error('리뷰리스트 가져오는 중 에러발생', error);
        } else {
            setReviews(data);
            
        }
    };

    useEffect(() => {
        fetchReviewList();
    }, [reviewProductId]);

    return { reviews, fetchReviewList };
}

export default useProductReviews