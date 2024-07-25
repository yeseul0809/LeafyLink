import { Tables } from "./supabase";

export type Product = Tables<"Product">
export interface ProductProps extends Product {
    thumbnail?: File | null; 
}