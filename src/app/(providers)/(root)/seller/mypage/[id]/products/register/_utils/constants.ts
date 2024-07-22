import { ProductState } from '../types/product';

export const INITIAL_STATE: ProductState = {
  category: '',
  name: '',
  price: '',
  stock: '',
  thumbnail: null
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
