'use server';

import { createClient } from '@/supabase/supabaseServer';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
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

//주문내역
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

//판매중인상품
export async function getProducts(
  sellerId: string,
  page: number,
  itemsPerPage: number,
  category: string
) {
  const supabase = createClient();

  // 판매자 유효성 검사
  const { data: seller, error: sellerError } = await supabase
    .from('Seller')
    .select('*')
    .eq('seller_id', sellerId)
    .single();

  if (sellerError || !seller) {
    throw new Error('유효하지 않은 판매자입니다');
  }

  // 카테고리로 필터링
  const categoryCondition = category !== 'all' ? { category } : {};

  // 총 제품 수 조회
  const { count: totalProducts, error: countError } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('product_seller_id', sellerId)
    .match(categoryCondition);

  if (countError) {
    throw new Error(`총 제품 수를 조회하는 중 오류가 발생했습니다: ${countError.message}`);
  }

  // 현재 페이지의 제품 데이터 조회
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select(
      'category, title, price, stock, product_id, created_at, description, product_seller_id, thumbnail_url, updated_at, sale_price'
    )
    .eq('product_seller_id', sellerId)
    .match(categoryCondition)
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

  if (productError) {
    throw new Error(`제품 데이터를 가져오는 중 오류가 발생했습니다: ${productError.message}`);
  }

  return {
    products: products || [],
    totalProducts: totalProducts || 0
  };
}

// 판매자 페이지 - 등록된 상품 삭제
export async function deleteProducts(productsId: string[]) {
  const supabaseServer: SupabaseClient<Database> = createClient();

  const { data, error } = await supabaseServer
    .from('Product')
    .delete()
    .in('product_id', productsId);

  if (error) {
    console.error('상품 삭제 중 오류가 발생했습니다.', error);
    throw new Error('상품 삭제 중 오류가 발생했습니다.');
  }
}

// 상품등록을 할 때 유효성 검사 할 때 사용
export async function getSellerInfo(sellerId: string) {
  const supabase = createClient();

  const { data: seller, error } = await supabase
    .from('Seller')
    .select('address')
    .eq('seller_id', sellerId)
    .single();

  if (error || !seller) {
    throw new Error('판매자 정보를 가져오는 중 오류가 발생했습니다');
  }
  console.log('주소', seller);

  return seller;
}
