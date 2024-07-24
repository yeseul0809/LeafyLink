'use client';

import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { ProductInfo } from './page';

const paymentHandler = (productData:ProductInfo) => {
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
    name: `${productData.combinedData[0].title} 외 ${productData.combinedData.length-1}건`,
    amount: productData.totalCost,
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678'
  };

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, callback);
};

async function callback(rsp: any) {
  const { success, error_msg, merchant_uid, imp_uid } = rsp;

  console.log('success::', success);

  if (success) {
    alert('결제성공');
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}

export default paymentHandler;
