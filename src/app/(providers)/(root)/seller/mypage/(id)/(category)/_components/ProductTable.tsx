'use client';

import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import { createClient } from '@/supabase/supabaseClient';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
}

export default function ProductTable({ sellerId }: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSellerValid, setIsSellerValid] = useState<boolean>(false);
  const supabase = createClient();

  // 판매자 유효성 확인 함수
  const checkSellerValidity = async () => {
    const { data: user, error: userErr } = await supabase
      .from('Seller')
      .select('*')
      .eq('seller_id', sellerId)
      .single();

    if (userErr || !user) {
      // 오류가 발생했거나 판매자가 존재하지 않을 경우
      router.push('/');
    } else {
      setIsSellerValid(true); // 판매자 유효성 설정
    }
  };

  // 판매자 유효성을 가장 먼저 확인
  useEffect(() => {
    checkSellerValidity(); // 판매자 유효성 확인
  }, [sellerId]);

  // 제품을 가져오는 함수
  const fetchProducts = async (page: number, category: string) => {
    if (!isSellerValid) return; // 판매자가 유효하지 않으면 제품을 가져오지 않음

    setLoading(true);
    const categoryCondition = category !== 'all' ? `${category}` : '';

    // 총 제품 수 조회
    const { count: totalProducts, error: countError } = await supabase
      .from('Product')
      .select('*', { count: 'exact' })
      .eq('product_seller_id', sellerId);

    if (countError) {
      console.error('총 제품 수 조회 에러:', countError.message);
      setLoading(false);
      return;
    }
    setTotalProducts(totalProducts || 0);

    // 현재 페이지의 제품 데이터 조회
    const { data, error } = await supabase
      .from('Product')
      .select(
        'category, title, price, stock, product_id, created_at, description, product_seller_id, thumbnail_url, updated_at'
      )
      .eq('product_seller_id', sellerId)
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('오류가 발생했습니다:', error.message);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
    console.log('테스트:', data);
  };

  useEffect(() => {
    if (isSellerValid) {
      // 판매자가 유효한 경우에만 제품을 가져옴
      const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
      setCurrentPage(page);
      fetchProducts(page, categoryFilter);
    }
  }, [searchParams, sellerId, itemsPerPage, categoryFilter, isSellerValid]);

  // const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedCategory = event.target.value;
  //   setCategoryFilter(selectedCategory);
  //   setCurrentPage(1);
  //   router.push(`?page=1`);
  // };

  const handleMoveEditPage = (id: string) => {
    router.push(`/seller/mypage/${id}/edit`);
  };

  const filteredProducts =
    categoryFilter === 'all'
      ? products
      : products.filter((product) => product.category === categoryFilter);

  const formatCurrency = (value: number | null): string => {
    if (value === null) {
      return 'N/A';
    }
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      currencyDisplay: 'code'
    })
      .format(value)
      .replace('KRW', '')
      .trim();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-screen-xl mx-auto  mb-20">
      <div className="flex justify-end mt-[28px] mb-[16px] ">
        <Link
          href={`/seller/mypage/${sellerId}/register`}
          className="px-[12px] py-[9px] bg-primary-green-500 rounded text-white text-[13px] font-normal leading-[18px] tracking-[-0.325px] "
        >
          상품 등록
        </Link>
      </div>
      {/* </div> */}
      <div className="">
        <div className="flex items-start bg-secondary-yellow-100 ">
          <div className="w-[178px] h-[56px] p-[16px] flex justify-center items-center">
            카테고리
          </div>
          <div className="flex p-[16px] justify-center items-center flex-1">상품명</div>
          <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center text-[16px] font-normal leading-[24px] tracking-[-0.4px]">
            가격
          </div>
          <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center text-[16px] font-normal leading-[24px] tracking-[-0.4px]">
            수량
          </div>
          <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center text-[16px] font-normal leading-[24px] tracking-[-0.4px]">
            상태
          </div>
          <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center text-[16px] font-normal leading-[24px] tracking-[-0.4px]">
            수정
          </div>
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              className="flex items-start self-stretch border-b border-Line/Light border-b border-Line/Light"
            >
              <div className="flex w-[178px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2 ">
                {product.category}
              </div>
              <div className="flex p-[22px_16px] items-center gap-2.5 flex-1 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main text-font/sub2 overflow-hidden whitespace-nowrap text-ellipsis ">
                {product.title}
              </div>
              <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2 overflow-hidden whitespace-nowrap text-ellipsis">
                {formatCurrency(product.price ?? 0)}원
              </div>
              <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2 ">
                {product.stock ?? 0}
              </div>
              <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] ">
                <span
                  className={product.stock === 0 ? 'text-font/Disabled' : 'text-primary-green-500'}
                >
                  {product.stock === 0 ? '품절' : '판매중'}
                </span>
              </div>
              <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 ">
                <button
                  onClick={() => handleMoveEditPage(product.product_id)}
                  className="px-[12px] py-[9px] border border-primary-green-500 bg-white rounded text-primary-green-500 text-[13px] font-normal leading-[18px] tracking-[-0.325px]"
                >
                  상품 수정
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">판매중인 제품이 없습니다.</div>
        )}
      </div>
      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        pageCount={10}
        itemCountPerPage={itemsPerPage}
      />
    </section>
  );
}
