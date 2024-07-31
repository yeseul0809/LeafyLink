'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Product = {
  category: string;
  title: string;
  price: number | null;
  stock: number | null;
  product_id: string;
  created_at: string | null;
  description: string;
  product_seller_id: string;
  thumbnail_url: string;
  updated_at: string | null;
};

interface ProductTableProps {
  sellerId: string;
  products: Product[];
}

export default function ProductTable({ sellerId, products }: ProductTableProps) {
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleMoveEditPage = (id: string) => {
    router.push(`/seller/mypage/${id}/edit`);
  };

  // 필터링된 제품 리스트
  const filteredProducts =
    categoryFilter === 'all'
      ? products
      : products.filter((product) => product.category === categoryFilter);

  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <button className="p-2 bg-gray-300 rounded">상품 추가</button>
        </div>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="w-[15%] p-4 border-b text-center">
                <select
                  id="category"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="all">카테고리</option>
                  <option value="씨앗">씨앗</option>
                  <option value="원예용품">원예용품</option>
                  <option value="흙, 비료">흙, 비료</option>
                  <option value="모종">모종</option>
                  <option value="재배키트">재배키트</option>
                </select>
              </th>
              <th className=" p-4 border-b ">상품명</th>
              <th className="w-[15%] p-4 border-b text-center">가격</th>
              <th className="w-[15%] p-4 border-b text-center">수량</th>
              <th className="w-[15%] p-4 border-b text-center">상태</th>
              <th className="w-[10%] p-4 border-b text-center">수정</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.product_id}>
                  <td className="p-4 border-b text-center">{product.category}</td>
                  <td className="p-4 border-b ">{product.title}</td>
                  <td className="p-4 border-b text-center">{product.price}원</td>
                  <td className="p-4 border-b text-center">{product.stock} 개</td>
                  <td className="p-4 border-b text-center">
                    {product.stock === 0 ? '품절' : '판매중'}
                  </td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleMoveEditPage(product.product_id)}
                      className="p-2 bg-gray-200 rounded"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  판매중인 제품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
