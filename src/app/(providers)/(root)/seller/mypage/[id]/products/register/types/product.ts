export interface ProductState {
  category: string;
  name: string;
  price: number | string;
  stock: number | string;
  thumbnail: File | null;
}
