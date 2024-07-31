import { createClient } from '@/supabase/supabaseServer';
import AccordionMenu from '../_components/AccordionMenu';
import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';

import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';

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

interface ProductPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}

export default async function SellerOrderListPage({ params, searchParams }: ProductPageProps) {
  const { id } = params;
  const supabase = createClient();

  // 페이지네이션 설정
  const currentPage = parseInt(searchParams.page as string, 10) || 1; // 현재 페이지
  const itemsPerPage = 1; // 한 페이지에 표시할 주문 수

  // 총 주문 수 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_seller_id', id);

  if (countError) {
    return <div>총 주문 수 조회 에러: {countError.message}</div>;
  }

  // 현재 페이지의 주문 데이터 조회
  const { data: orders, error: orderError } = await supabase
    .from('Order')
    .select(
      `
      order_id,
      order_product_id,
      cost,
      quantity,
      order_date,
      order_user_id,
      order_seller_id,
      Product:order_product_id (title), 
      User:order_user_id (user_name, phone, address, address_detail, email)
    `
    )
    .eq('order_seller_id', id)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
  if (orderError) {
    return <div>주문 데이터 조회 에러: {orderError.message}</div>;
  }

  console.log('페이지주문데이터:', orders);
  if (!orders || orders.length === 0) {
    return <div>주문이 없습니다.</div>;
  }

  const typeOrders = orders as unknown;
  const myOrdersType = typeOrders as Order[];

  return (
    <>
      <AccordionMenu orders={myOrdersType} />
      <Pagination
        totalItems={totalOrders || 0} // 전체 주문의 총 개수
        currentPage={currentPage} // 현재 페이지 번호
        pageCount={10} // 페이지 버튼의 최대 개수
        itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
      />
    </>
  );
}
