'use client';
import { getSaleProducts } from '@/app/(providers)/(root)/(home)/actions';
import { useEffect, useState } from 'react';

export default function useSaleState(productId: string) {
  const [isSale, setIsSale] = useState(false);
  const nowDate = new Date();

  useEffect(() => {
    const fetchSaleProductsData = async () => {
      const saleProductsData = await getSaleProducts();
      if (saleProductsData) {
        const product = saleProductsData.find((product) => product.product_id === productId);
        if (product) {
          const saleStartDate = new Date(product.sale_starttime);
          const saleEndDate = new Date(product.sale_endtime);

          const isOnSale = nowDate >= saleStartDate && nowDate <= saleEndDate;
          setIsSale(isOnSale);
        }
      }
    };
    fetchSaleProductsData();
  }, [productId]);

  return isSale;
}

// 세일 기간이 현재 날짜보다 크면 isSale false 작으면 isSale true
// if (nowDate < saleStart || nowDate > saleEnd) {
//   setIsSale(false);
// } else if (nowDate >= saleStartDate && nowDate <= saleEndDate) {
//   setIsSale(true);
// }
// return isSale;
