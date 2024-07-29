'use client';
import { createClient } from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';

type Product = {
  product_id: string;
  category: string;
  title: string;
  price: number;
  thumbnail_url: string;
  description: string;
  created_at: string;
};

function NewProduct() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const supabase = createClient();
    const getProducts = async () => {
      try {
        const { data: Product, error } = await supabase.from('Product').select('*');
        if (error) throw error;
        if (Product != null) {
          const sortedProducts = Product.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setNewProducts(sortedProducts);
        }
      } catch (error) {
        console.log('신제품 불러오기 에러', error);
      }
    };
    getProducts();
  }, []);

  const topProducts = newProducts.slice(0, 8);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <section className="w-[1240px] mx-auto mt-[93px] ">
      <h2 className="text-[32px] text-center mb-[43px]">신제품</h2>
      <div className=" grid grid-cols-4 gap-x-[20px]	gap-y-[24px] justify-items-center">
        {topProducts.map((product) => (
          <div className="w-[295px]">
            <img src={product.title} className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></img>
            <p className="mt-[24px] text-sm font-semibold	">{product.title}</p>
            <p className="line-clamp-2 text-sm text-[#555555] text-ellipsis overflow-hidden">
              {product.description}
            </p>
            <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price)}원</p>
          </div>
        ))}
      </div>
      {/* <div className=" grid grid-cols-4 gap-x-[20px]	gap-y-[24px] justify-items-center">
        <div className="w-[295px]">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="line-clamp-2 text-sm text-[#555555] text-ellipsis overflow-hidden">
            상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명상품설명
          </p>
          <p className="mt-[10px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px] h-auto">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
      </div> */}
    </section>
  );
}

export default NewProduct;
