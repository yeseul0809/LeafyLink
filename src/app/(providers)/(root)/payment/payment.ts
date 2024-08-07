'use client';

import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { createClient } from '@/supabase/supabaseClient';
import { ProductInfo } from './_components/Payment';
import { updateStock } from './actions';

const paymentHandler = (productData: ProductInfo, userId: string) => {
  if (!window.IMP) return;
  const { IMP } = window;
  IMP.init('imp03766407');

  const transformedData = transformProductData(productData);
  const encodedProductData = encodeURIComponent(JSON.stringify(transformedData));

  const data: RequestPayParams = {
    // pg: 'html5_inicis.INIpayTest',
    // pg: 'kcp.AO09C',
    pg: 'kakaopay.TC0ONETIME',
    // pg: 'uplus.tlgdacomxpay',
    // pg: 'tosspay.tosstest',
    pay_method: 'card',
    merchant_uid: `mid_${new Date().getTime()}`,
    name: `${productData.combinedData[0].title} 외 ${productData.combinedData.length - 1}건`,
    amount: productData.totalCost,
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678',
    m_redirect_url: `https://leafylink-hys-projects-073e5858.vercel.app/settlement/?data=${encodedProductData}`
    // m_redirect_url: `http://localhost:3000/settlement/?data=${encodedProductData}`
  };

  IMP.request_pay(data, (rsp: RequestPayResponse) => callback(rsp, productData, userId));
};

interface ProductData {
  combinedData: {
    price: number;
    quantity: number;
    title: string;
    thumbnail_url: string;
    product_id: string;
  }[];
  totalCost: number;
  cart: boolean;
}

export interface TransformedProduct {
  price: number;
  quantity: number;
  title: string;
  thumbnail_url: string;
  product_id: string;
}

function transformProductData(productData: ProductData): TransformedProduct[] {
  return productData.combinedData.map((product) => ({
    price: product.price,
    quantity: product.quantity,
    title: product.title,
    thumbnail_url: product.thumbnail_url,
    product_id: product.product_id
  }));
}

async function callback(rsp: any, productData: ProductInfo, userId: string) {
  const { success, error_msg, merchant_uid, imp_uid } = rsp;
  if (success) {
    const supabase = createClient();
    for (const product of productData.combinedData) {
      const { error: cartError } = await supabase
        .from('Cart')
        .delete()
        .eq('cart_product_id', product.product_id);

      if (cartError) {
        console.error(`Error deleting product ${product.product_id} from Cart:`, cartError);
      }

      const orderData = {
        order_user_id: userId,
        order_product_id: product.product_id,
        order_seller_id: product.product_seller_id,
        quantity: product.quantity,
        cost: product.price * product.quantity,
        is_payed: true
      };

      const { error: orderError } = await supabase.from('Order').insert([orderData]);

      if (orderError) {
        console.error(`Error insert data to Order table:`, orderError);
      }
    }
    updateStock(productData);
    alert('결제성공');
    const transformedData = transformProductData(productData);
    const encodedProductData = encodeURIComponent(JSON.stringify(transformedData));
    window.location.href = `/settlement/?data=${encodedProductData}`;
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}

export default paymentHandler;
