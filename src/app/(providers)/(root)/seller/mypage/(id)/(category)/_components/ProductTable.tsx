'use client';

import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductTableMobli from './ProductTableMobli';
import { deleteProducts, getProducts } from '../action';

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
  const [itemsPerPage] = useState<number>(10);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deletedProductsCount, setDeletedProductsCount] = useState<number>(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
      const { products, totalProducts } = await getProducts(
        sellerId,
        page,
        itemsPerPage,
        categoryFilter
      );

      if (products.length === 0 && page > 1) {
        router.push(`?page=${page - 1}`);
        return;
      }

      setProducts(products);
      setTotalProducts(totalProducts);
      setDeletedProductsCount(0);
    } catch (error) {
      console.error('제품 데이터를 가져오는 중 오류가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, categoryFilter, sellerId]);

  const handleMoveEditPage = (id: string) => {
    router.push(`/seller/mypage/${id}/edit`);
  };

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

  //로딩
  if (loading) {
    return <div></div>;
  }

  const handleDeleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) return;

    try {
      await deleteProducts(selectedProducts); // 선택된 상품 DB에서 삭제
      setProducts(products.filter((product) => !selectedProducts.includes(product.product_id))); // 삭제된 상품 제외한 나머지 상품들로 상품목록(products) 상태 업데이트
      fetchProducts(); // 삭제 후 바로 업데이트된 데이터로 다시 fetch
      setSelectedProducts([]); // 선택된 상품 목록 초기화
    } catch (error) {
      console.error('상품 삭제 중 오류가 발생했습니다:', error);
    }
  };

  // 개별항목 체크박스 선택
  const handleCheckboxChange = (productId: string, ischecked: boolean) => {
    if (ischecked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  // 전체항목 체크박스 선택
  const handleAllCheckboxChange = (ischecked: boolean) => {
    if (ischecked) {
      setSelectedProducts(products.map((product) => product.product_id));
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <>
      <section className="max-w-[1280px]  mx-auto mb-20 hidden md:block ">
        <div className="flex justify-end mt-[28px] gap-5">
          <button
            onClick={handleDeleteSelectedProducts}
            className={`px-[12px] py-[9px] rounded text-[13px] font-normal leading-[18px] tracking-[-0.325px]
              ${selectedProducts.length > 0 ? 'bg-primary-green-50 text-primary-green-400 transition-colors duration-300 hover:bg-primary-green-100 hover:text-primary-green-400' : 'bg-grayscale-gray-50 text-grayscale-gray-500'}`}
            disabled={selectedProducts.length === 0}
          >
            상품 삭제
          </button>
          <Link
            href={`/seller/mypage/${sellerId}/register`}
            className="px-[12px] py-[9px] bg-primary-green-500 rounded text-white text-[13px] font-normal leading-[18px] tracking-[-0.325px] transition-colors duration-300 hover:bg-primary-green-700 hover:text-white"
          >
            상품 등록
          </Link>
        </div>
        <div className="mt-[16px]">
          {products.length > 0 ? (
            <>
              <div className="flex items-start bg-secondary-yellow-100">
                <input
                  type="checkbox"
                  id="allcheck"
                  className="w-[22px] h-[22px] m-4 bg-white green-checkbox"
                  onChange={(e) => handleAllCheckboxChange(e.target.checked)}
                  checked={selectedProducts.length === products.length}
                />
                <div className="w-[178px] h-[56px] p-[16px] flex justify-center items-center">
                  카테고리
                </div>
                <div className="flex-1 px-[20px] py-[16px] flex justify-center items-center truncate ">
                  상품명
                </div>
                <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center ">
                  가격
                </div>
                <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center ">
                  수량
                </div>
                <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center ">
                  상태
                </div>
                <div className="w-[130px] h-[56px] p-[16px] flex justify-center items-center ">
                  수정
                </div>
              </div>

              {products.map((product) => (
                <div
                  key={product.product_id}
                  className="flex items-start self-stretch border-b border-Line/Light"
                >
                  <input
                    type="checkbox"
                    id="allcheck"
                    className="w-[22px] h-[22px] m-4 bg-white green-checkbox"
                    onChange={(e) => handleCheckboxChange(product.product_id, e.target.checked)}
                    checked={selectedProducts.includes(product.product_id)}
                  />
                  <div className="flex w-[178px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2">
                    {product.category}
                  </div>

                  <div className="flex p-[22px_16px] items-center gap-2.5 flex-1 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main overflow-hidden whitespace-nowrap flex p-[22px_16px] items-center gap-2.5 flex-1 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main truncate webkit-box ">
                    {product.title}
                  </div>

                  <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {formatCurrency(product.price ?? 0)}원
                  </div>
                  <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/sub2">
                    {product.stock ?? 0}
                  </div>
                  <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5 text-[14px] font-normal leading-[20px] tracking-[-0.35px]">
                    <span
                      className={
                        product.stock === 0 ? 'text-font/Disabled' : 'text-primary-green-500'
                      }
                    >
                      {product.stock === 0 ? '품절' : '판매중'}
                    </span>
                  </div>
                  <div className="flex w-[130px] h-[64px] p-[22px_16px] justify-center items-center gap-2.5">
                    <button
                      onClick={() => handleMoveEditPage(product.product_id)}
                      className="px-[12px] py-[9px] border border-primary-green-500 bg-white rounded text-primary-green-500 text-[13px] font-normal leading-[18px] tracking-[-0.325px]
                    transition-colors duration-300 hover:bg-primary-green-50 hover:text-primary-green-500"
                    >
                      상품 수정
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className=" overflow-hidden text-ellipsis text-font/main text-15-n-22-375 mt-[16px] text-center">
              판매중인 제품이 없습니다.
            </div>
          )}
        </div>

        <Pagination
          totalItems={totalProducts}
          currentPage={currentPage}
          pageCount={10}
          itemCountPerPage={itemsPerPage}
        />
      </section>
      {/* 모바일 환경 */}

      <div className="block md:hidden  px-[20px]">
        {products.map((product) => (
          <ProductTableMobli
            key={product.product_id}
            product={product}
            formatCurrency={formatCurrency}
          />
        ))}
        <Pagination
          totalItems={totalProducts}
          currentPage={currentPage}
          pageCount={5}
          itemCountPerPage={itemsPerPage}
        />
      </div>
    </>
  );
}
