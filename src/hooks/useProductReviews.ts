import { ProductReviewProps } from "@/app/(providers)/(root)/products/[id]/_components/Review";
import supabase from "@/supabase/supabaseClient";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

function useProductReviews({review_product_id} : ProductReviewProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    useEffect(()=>{
        const fetchReviewList = async() => {
            const {data, error} = await supabase.from('Review').select('*').eq('review_product_id', review_product_id)

            if(error) {
                console.error('리뷰리스트 가져오는 중 에러발생', error)
            } else {
                setReviews(data)
            }
        }
        fetchReviewList()

    },[review_product_id])
    return{reviews}
}

export default useProductReviews