import { Product } from "@/types/product";

export const INITIAL_STATE: Product = {
  category: '',
  title: '',
  price: '',
  stock: '',
  thumbnail: null,
  description:''
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
