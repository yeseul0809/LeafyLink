'use client';
import { createClient } from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from './_components/ProductCard';

function Goods() {
  const [goodsProducts, setGoodsProducts] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const getProducts = async () => {
      try {
        const { data: product, error } = await supabase
          .from('Product')
          .select('*')
          .eq('category', '원예용품');
        if (error) throw error;
        console.log(product);
        if (product != null) {
          setGoodsProducts(product);
        }
      } catch (error) {
        console.log('식집사템 불러오기 에러', error);
      }
    };
    getProducts();
  }, []);

  const topProducts = goodsProducts.slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  return (
    <section className="w-[1240px] mx-auto mt-[93px] mb-[180px]">
      <h2 className="text-[32px] text-center mb-[43px]">식집사 필수템</h2>
      <div className=" grid grid-cols-4 gap-x-[20px]	gap-y-[24px] justify-items-center">
        {topProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}

export default Goods;
