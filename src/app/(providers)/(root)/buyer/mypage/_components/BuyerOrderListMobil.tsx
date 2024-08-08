import React from 'react';

interface Product {
  title: string;
}

interface Order {
  order_id: number;
  order_date: string;
  cost: number;
  is_payed: boolean;
  Product: Product | null;
}

interface BuyerOrderListMobileProps {
  orders: Order[];
  formatDate: (dateString: string) => string;
  formatCurrency: (value: number) => string;
}

export default function BuyerOrderListMobile({
  orders,
  formatDate,
  formatCurrency
}: BuyerOrderListMobileProps) {
  return (
    <div className="flex flex-col gap-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="flex-col justify-start items-start gap-2 flex border-b border-Line/Light py-2"
          >
            <div className="w-[335px] h-5 justify-start items-center gap-2 inline-flex">
              <div className="text-font/main text-16-n-24-40"> {order.order_id}</div>
              <div className="text-font/main text-16-n-24-40 text-left">
                {order.Product?.title || '제품 없음'}
              </div>
            </div>
            <div className="h-[18px] justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-1 flex">
                <div className="text-font/sub2">날짜:</div>
                <div className="text-font/main">{formatDate(order.order_date)}</div>
              </div>
              <div className="justify-start items-center gap-1 flex">
                <div className="text-font/sub2">결제 금액:</div>
                <div className="text-font/main">{formatCurrency(order.cost)}원</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-[15px] font-normal leading-[22px] tracking-[-0.375px] text-font/main mt-20">
          구매내역이 아직 없습니다.
        </div>
      )}
    </div>
  );
}
