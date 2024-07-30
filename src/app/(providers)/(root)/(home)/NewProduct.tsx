'use client';
import { createClient } from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from './_components/ProductCard';

function NewProduct() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

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
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewProduct;
