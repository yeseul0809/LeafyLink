import React from 'react';
import { Product } from '@/types/product';

// interface ProductPropsType {
//   product: Product;
// }

const ProductCard = ({ product }: { product: Product }) => {
  // 60%
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  return (
    <div>
      <div className="w-[295px]" key={product.product_id}>
        <img
          src={product.thumbnail_url}
          className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"
        ></img>
        <p className="mt-[24px] text-sm font-semibold	">{product.title}</p>
        <p className="line-clamp-2 text-sm text-[#555555] text-ellipsis overflow-hidden">
          {product.description}
        </p>
        <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price)}원</p>
      </div>
    </div>
  );
};

export default ProductCard;
