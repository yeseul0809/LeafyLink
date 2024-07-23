export interface Product {
    product_id?: string;
    productseller_?: string;
    category: string;
    title: string;
    price: number | string;
    description: string;
    stock: number | string;
    thumbnail_url?: string;
    created_at?: string;
    updated_at?: string;
    thumbnail?: File | null;
  }