import { Product } from "@/types/product";

export const INITIAL_STATE: Product = {
  category: '',
  title: '',
  price: undefined,
  stock: undefined,
  description: '',
  created_at: null,
  updated_at: null,
  product_id: '',
  productseller_id: '', 
  thumbnail_url: '' 
};

export const FORMATS = [
  'float',
  'height',
  'width',
  'size',
  'bold',
  'underline',
  'blockquote',
  'list',
  'link',
  'image',
  'align',
  'color',
  'background'
];
