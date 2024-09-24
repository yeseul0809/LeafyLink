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
