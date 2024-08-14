import Pagination from '../_components/Pagination';
import { notFound, redirect } from 'next/navigation';
import BuyerOrderListMobile from '../_components/BuyerOrderListMobil';
import { buyerOrders, formatCurrency, formatDate } from '../../action';
import { createClient } from '@/supabase/supabaseServer';

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

  if (userError || !user) {
    redirect('/login');
  }

  const userId = user?.id;
  if (!userId) {
    redirect('/login');
  }

  try {
    const { ordersWithProducts, totalOrders } = await buyerOrders(
      userId,
      currentPage,
      itemsPerPage
    );

    return (
      <section className="max-w-screen-xl mx-auto">
        <div className="hidden md:block my-20">
          <ul className="flex items-start bg-secondary-yellow-100 border-b border-Line/Light text-font/main">
            <li className="flex w-[15%] h-[56px] p-[16px] justify-center items-center gap-[10px]">
              <label className="text-center text-font/main text-16-n-24-40">주문 번호</label>
            </li>
            <li className="flex p-[16px] justify-center items-center gap-[10px] flex-1">
              <label className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-center text-font/main text-16-n-24-40">
                상품명
              </label>
            </li>
            <li className="flex w-[11%] h-[56px] p-[16px] justify-center items-center gap-[10px]">
              <label className="text-center text-font/main text-16-n-24-40">주문 날짜</label>
            </li>
            <li className="flex w-[11%] h-[56px] p-[16px] justify-center items-center gap-[10px]">
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
                  <li className="flex p-[22px_16px] items-center gap-[10px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-center">
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
        </div>

        {/* 모바일 환경에서만 보이는 콘텐츠 */}
        <div className="block md:hidden px-[20px]">
          <BuyerOrderListMobile
            orders={ordersWithProducts}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />

          <Pagination
            totalItems={totalOrders || 0}
            currentPage={currentPage}
            pageCount={5}
            itemCountPerPage={itemsPerPage}
          />
        </div>
      </section>
    );
  } catch (error) {
    return notFound;
  }
}
