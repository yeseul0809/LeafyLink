'use client';

import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { createClient } from '@/supabase/supabaseClient';
import { ProductInfo } from './_components/Payment';
import { updateStock } from './actions';

const paymentHandler = (productData: ProductInfo, userId: string) => {
  if (!window.IMP) return;
  /* 1. 가맹점 식별하기 */
  const { IMP } = window;
  IMP.init('imp03766407'); // 가맹점 식별코드

  /* 2. 결제 데이터 정의하기 */
  const data: RequestPayParams = {
    // pg: 'html5_inicis.INIpayTest',
    // pg: 'kcp.AO09C',
    pg: 'kakaopay.TC0ONETIME',
    // pg: 'uplus.tlgdacomxpay',
    // pg: 'tosspay.tosstest',
    pay_method: 'card',
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    name: `${productData.combinedData[0].title} 외 ${productData.combinedData.length - 1}건`,
    amount: productData.totalCost,
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678'
  };

  /* 4. 결제 창 호출하기 */
  // IMP.request_pay(data, callback);
  IMP.request_pay(data, (rsp: RequestPayResponse) => callback(rsp, productData, userId));
};

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
    window.location.href = '/';
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}

export default paymentHandler;
