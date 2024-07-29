// 'use client';
// import '@/app/globals.css';
// import { Accordion, AccordionItem } from '@szhsin/react-accordion';

// // Product 타입
// interface Product {
//   title: string;
// }

// // User 타입
// interface User {
//   user_name: string;
//   phone: string;
//   address: string;
//   address_detail: string;
//   email: string;
// }

// // Order 타입
// interface Order {
//   order_id: number;
//   order_product_id: string;
//   cost: number;
//   quantity: number;
//   order_date: string;
//   order_user_id: string;
//   order_seller_id: string;
//   Product: Product | null;
//   User: User | null;
// }

// interface AccordionMenuProps {
//   orders: Order[];
// }

// export default function AccordionMenu({ orders }: AccordionMenuProps) {
//   if (orders.length === 0) {
//     return <div>주문이 없습니다.</div>;
//   }

//   return (
//     <div>
//       <div>
//         <div>
//           <div className="flex justify-between p-4 border-b bg-gray-300">
//             <span className="w-[20%]">주문 번호</span>
//             <span className="w-[80%]">상품명</span>
//           </div>
//         </div>
//         <div>
//           <Accordion>
//             {orders.map((order) => (
//               <AccordionItem
//                 key={order.order_id}
//                 header={
//                   <div className="flex justify-between p-4 border-b bg-white cursor-pointer">
//                     <span className="w-[20%]">{order.order_id}</span>
//                     <span className="w-[80%] text-left">{order.Product?.title || '제품 없음'}</span>
//                   </div>
//                 }
//               >
//                 <div className="flex justify-between border p-4 my-2">
//                   <div className="w-1/2">
//                     <div>[상품 정보]</div>
//                     <div className="mb-2">
//                       <strong>상품명:</strong> {order.Product?.title || 'N/A'}
//                     </div>
//                     <div className="mb-2">
//                       <strong>수량:</strong> {order.quantity}
//                     </div>
//                     <div className="mb-2">
//                       <strong>결제금액:</strong> {order.cost}원
//                     </div>
//                     <div className="mb-2">
//                       <strong>주문일자:</strong> {order.order_date}
//                     </div>
//                   </div>
//                   <div className="w-1/2">
//                     <div>[주문자 정보]</div>
//                     <div className="mb-2">
//                       <strong>이름:</strong> {order.User?.user_name || 'N/A'}
//                     </div>
//                     <div className="mb-2">
//                       <strong>전화번호:</strong> {order.User?.phone || 'N/A'}
//                     </div>
//                     <div className="mb-2">
//                       <strong>주소:</strong> {order.User?.address || 'N/A'}{' '}
//                       {order.User?.address_detail || 'N/A'}
//                     </div>
//                     <div className="mb-2">
//                       <strong>이메일:</strong> {order.User?.email || 'N/A'}
//                     </div>
//                   </div>
//                 </div>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import '@/app/globals.css';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

// Product 타입
interface Product {
  title: string;
}

// User 타입
interface User {
  user_name: string;
  phone: string;
  address: string;
  address_detail: string;
  email: string;
}

// Order 타입
interface Order {
  order_id: number;
  order_product_id: string;
  cost: number;
  quantity: number;
  order_date: string;
  order_user_id: string;
  order_seller_id: string;
  Product: Product;
  User: User;
}

interface AccordionMenuProps {
  orders: Order[];
}

export default function AccordionMenu({ orders }: AccordionMenuProps) {
  if (orders.length === 0) {
    return <div>주문이 없습니다.</div>;
  }
  console.log(orders);
  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between p-4 border-b bg-gray-300">
            <span className="w-[20%]">주문 번호</span>
            <span className="w-[80%]">상품명</span>
          </div>
        </div>
        <div>
          <Accordion>
            {orders.map((order) => (
              <AccordionItem
                key={order.order_id}
                header={
                  <div className="flex justify-between p-4 border-b bg-white cursor-pointer">
                    <span className="w-[20%]">{order.order_id}</span>
                    <span className="w-[80%] text-left">{order.Product?.title || '제품 없음'}</span>
                  </div>
                }
              >
                <div className="flex justify-between border p-4 my-2">
                  <div className="w-1/2">
                    <div>[상품 정보]</div>
                    <div className="mb-2">
                      <strong>상품명:</strong> {order.Product?.title || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>수량:</strong> {order.quantity}
                    </div>
                    <div className="mb-2">
                      <strong>결제금액:</strong> {order.cost}원
                    </div>
                    <div className="mb-2">
                      <strong>주문일자:</strong> {order.order_date}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div>[주문자 정보]</div>
                    <div className="mb-2">
                      <strong>이름:</strong> {order.User?.user_name || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>전화번호:</strong> {order.User?.phone || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>주소:</strong> {order.User?.address || 'N/A'}{' '}
                      {order.User?.address_detail || 'N/A'}
                    </div>
                    <div className="mb-2">
                      <strong>이메일:</strong> {order.User?.email || 'N/A'}
                    </div>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
