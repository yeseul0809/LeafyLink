export interface Review {
    created_at?: string | null
    description: string
    rating?: number | null
    review_id?: string
    review_product_id: string
    review_user_id: string
    review_user_name?: string | null
}