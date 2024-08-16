// 'use server';

// import { createClient } from '@/supabase/supabaseServer';
// import { redirect } from 'next/navigation';

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
//   Product: Product;
//   User: User;
// }

// export async function getSellerOrders(userId: string, currentPage: number, itemsPerPage: number) {
//   const supabase = createClient();

//   // 판매자 정보 조회
//   const { data: sellerData, error: sellerError } = await supabase
//     .from('Seller')
//     .select('*')
//     .eq('seller_id', userId)
//     .maybeSingle();

//   if (sellerError || !sellerData || sellerData.seller_id !== userId) {
//     redirect('/');
//   }

//   // 총 주문 수 조회
//   const { count: totalOrders, error: countError } = await supabase
//     .from('Order')
//     .select('*', { count: 'exact' })
//     .eq('order_seller_id', userId);

//   if (countError) {
//     throw new Error(`총 주문 수 조회 에러: ${countError.message}`);
//   }

//   // 현재 페이지의 주문 데이터 조회
//   const { data: orders, error: orderError } = await supabase
//     .from('Order')
//     .select(
//       `
//       order_id,
//       order_product_id,
//       cost,
//       quantity,
//       order_date,
//       order_user_id,
//       order_seller_id,
//       Product:order_product_id (title),
//       User:order_user_id (user_name, phone, address, address_detail, email)
//     `
//     )
//     .eq('order_seller_id', userId)
//     .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

//   if (orderError) {
//     throw new Error(`주문 데이터 조회 에러: ${orderError.message}`);
//   }

//   return { orders: orders as Order[], totalOrders: totalOrders || 0 };
// }
'use server';

import { createClient } from '@/supabase/supabaseServer';
import { redirect } from 'next/navigation';

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

export async function getSellerOrders(userId: string, currentPage: number, itemsPerPage: number) {
  const supabase = createClient();

  // Seller 정보 조회
  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('*')
    .eq('seller_id', userId)
    .single();

  if (sellerError || !sellerData || sellerData.seller_id !== userId) {
    redirect('/');
  }

  // 총 주문 수 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_seller_id', userId);

  if (countError) {
    throw new Error(`총 주문 수 조회 에러: ${countError.message}`);
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
      Product:order_product_id!inner (title), 
      User:order_user_id!inner (user_name, phone, address, address_detail, email)
    `
    )
    .eq('order_seller_id', userId)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  if (orderError) {
    throw new Error(`주문 데이터 조회 에러: ${orderError.message}`);
  }
  const typeOrders = orders as unknown;
  const myOrdersType = typeOrders as Order[];
  console.log('엑션order', orders);
  const formattedOrders: Order[] = myOrdersType.map((order) => ({
    ...order,
    Product: order.Product,
    User: order.User
  }));
  console.log('데이터합치기', formattedOrders);
  return { orders: formattedOrders, totalOrders: totalOrders || 0 };
}
