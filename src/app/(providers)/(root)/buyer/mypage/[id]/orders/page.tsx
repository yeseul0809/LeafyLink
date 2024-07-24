'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '../../_components/Pagination';
import supabase from '@/supabase/supabaseClient';

interface ProductPageProps {
  params: { id: string };
}

const BuyerOrderListPage = ({ params }: ProductPageProps) => {
  const [orders, setOrders] = useState<any[]>([]); // 주문 데이터 상태
  const [totalOrders, setTotalOrders] = useState<number>(0); // 총 주문 개수 상태
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1'; // 현재 페이지 번호를 URL에서 가져옴
  const currentPage = parseInt(page, 10);
  const itemsPerPage = 10; // 페이지당 아이템 수

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치를 맨 위로 초기화

    const fetchOrderData = async () => {
      try {
        // 총 주문 개수 조회
        const { count: total, error: countError } = await supabase
          .from('Order')
          .select('*', { count: 'exact' })
          .eq('order_user_id', params.id);

        if (countError) {
          setError(countError.message);
          return;
        }
        setTotalOrders(total || 0);

        // 현재 페이지의 주문 데이터 조회
        const { data, error: dataError } = await supabase
          .from('Order')
          .select(
            `
            order_id,
            order_date,
            cost,
            order_product_id,
            is_payed,
            Product(title)
          `
          )
          .eq('order_user_id', params.id)
          .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1); // 현재 페이지의 범위 설정

        if (dataError) {
          setError(dataError.message);
        } else {
          setOrders(data);
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchOrderData();
  }, [params.id, currentPage]);

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  if (!orders.length && !error) {
    return <div>데이터를 불러오는 중...</div>;
  }

  // 금액 단위 표시
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      currencyDisplay: 'code'
    })
      .format(value)
      .replace('KRW', '')
      .trim();
  };

  // 날짜 표시
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">구매자 주문내역 페이지</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">주문 번호</th>
                <th className="py-2 px-4 border-b">상품명</th>
                <th className="py-2 px-4 border-b">주문 날짜</th>
                <th className="py-2 px-4 border-b">결제 금액</th>
                <th className="py-2 px-4 border-b">결제 상황</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td className="py-2 px-4 border-b">{order.order_id}</td>
                  <td className="py-2 px-4 border-b">{order.Product.title}</td>
                  <td className="py-2 px-4 border-b">{formatDate(order.order_date)}</td>
                  <td className="py-2 px-4 border-b">{formatCurrency(order.cost)}원</td>
                  <td className="py-2 px-4 border-b">{order.is_payed ? '결제 완료' : '미결제'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={totalOrders} // 전체 주문의 총 개수
          currentPage={currentPage} // 현재 페이지 번호
          pageCount={10} // 페이지 버튼의 최대 개수
          itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
        />
      </div>
    </>
  );
};

export default BuyerOrderListPage;
