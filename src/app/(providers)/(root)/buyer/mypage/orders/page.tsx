import { createClient } from '@/supabase/supabaseServer';
import Pagination from '../_components/Pagination';
import { redirect } from 'next/navigation';

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

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] };
}

export default async function BuyerOrderListPage({ searchParams }: ProductPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const currentPage = page || 1;
  const itemsPerPage = 10;
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (userError || !user) {
    redirect('/login');
  }

  if (!userId) {
    redirect('/login');
  }

  // 총 주문 수를 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_user_id', userId);

  if (countError) {
    return <div>총 주문 수 조회 에러: {countError.message}</div>;
  }

  // 현재 페이지의 주문 데이터 조회
  const { data: orders, error: orderError } = await supabase
    .from('Order')
    .select(
      `
      order_id,
      order_date,
      cost,
      is_payed,
      order_product_id
    `
    )
    .eq('order_user_id', userId)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  // 제품 데이터 조회
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('product_id, title');

  if (orderError || productError) {
    return <div>데이터 조회 에러: {orderError?.message || productError?.message}</div>;
  }

  // 주문과 제품 데이터를 결합
  const ordersWithProducts = orders?.map((order) => {
    const product = products?.find((p) => p.product_id === order.order_product_id);
    return {
      ...order,
      Product: product || null
    };
  }) as Order[];

  // 금액을 원화 형식으로 포맷하는 함수
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

  // 날짜를 'YY/MM/DD' 형식으로 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <section className="max-w-screen-xl mx-auto my-20">
        <ul className="flex items-start bg-secondary-yellow-100 border-b border-Line/Light text-font/main xs:hidden">
          <li className="flex w-[15%] h-[56px] p-[16px] justify-center items-center gap-[10px]  ">
            <label className="text-center text-font/main text-16-n-24-40">주문 번호</label>
          </li>
          <li className="flex p-[16px] justify-center items-center gap-[10px] flex-1">
            <label className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-center text-font/main text-16-n-24-40">
              상품명
            </label>
          </li>
          <li className="flex w-[11%] h-[56px] p-[16px] justify-center items-center gap-[10px] ">
            <label className="text-center text-font/main text-16-n-24-40">주문 날짜</label>
          </li>
          <li className="flex w-[11%] h-[56px] p-[16px] justify-center items-center gap-[10px] ">
            <label className="text-center text-font/main text-16-n-24-40">결제 금액</label>
          </li>
        </ul>

        <div>
          {Array.isArray(ordersWithProducts) && ordersWithProducts.length > 0 ? (
            ordersWithProducts.map((order) => (
              <ul
                key={order.order_id}
                className="flex items-start border-b border-Line/Light bg-white"
              >
                <li className="flex w-[15%] h-[64px] p-[22px_16px] justify-center items-center gap-[10px]">
                  <label className="text-16-n-24-40 text-center text-font/sub2">
                    {order.order_id}
                  </label>
                </li>
                <li className="flex p-[22px_16px] items-center gap-[10px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis text text-center">
                  <label className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-16-n-24-40 text-left">
                    {order.Product?.title || '제품 없음'}
                  </label>
                </li>
                <li className="flex w-[11%] h-[64px] p-[22px_16px] justify-center items-center gap-[10px]">
                  <label className="text-16-n-24-40 text-center text-font/sub2">
                    {formatDate(order.order_date)}
                  </label>
                </li>
                <li className="flex w-[11%] h-[64px] p-[22px_16px] justify-center items-center gap-[10px]">
                  <label className="text-16-n-24-40 text-center text-font/sub2">
                    {formatCurrency(order.cost)}원
                  </label>
                </li>
              </ul>
            ))
          ) : (
            <div className="text-center text-[15px] font-normal leading-[22px] tracking-[-0.375px] text-font/main mt-20">
              구매내역이 아직 없습니다.
            </div>
          )}
        </div>

        <Pagination
          totalItems={totalOrders || 0}
          currentPage={currentPage}
          pageCount={10}
          itemCountPerPage={itemsPerPage}
        />
      </section>
    </>
  );
}
