import { getSaleProducts } from '@/app/(providers)/(root)/(home)/actions';

export default async function useSalePercent(productId: string) {
  const saleProductsData = await getSaleProducts();
  const product = saleProductsData?.find((product) => product.product_id === productId);

  if (product) {
    const salePrice = product.sale_price;
    const price = product.price;

    if (price && salePrice) {
      // 할인율 계산: (정가 - 할인 가격) / 정가 * 100
      const discountPercent = Math.round(((price - salePrice) / price) * 100);
      return discountPercent;
    }
  }

  return null; // 할인 중이 아니거나 상품이 없을 경우 null 반환
}
