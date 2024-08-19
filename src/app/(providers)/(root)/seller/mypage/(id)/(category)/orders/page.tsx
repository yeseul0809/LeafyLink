import AccordionMenu from '../_components/AccordionMenu';
import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import { getSellerOrders } from '../action';

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] };
}

export default async function SellerOrderListPage({ searchParams }: ProductPageProps) {
  const supabase = createClient();

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // 사용자 정보가 없거나 오류가 발생한 경우 로그인 페이지로 리디렉션
  if (userError || !userId) {
    redirect('/login');
  }

  const currentPage = parseInt(searchParams.page as string, 10) || 1;
  const itemsPerPage = 10;

  try {
    const { orders, totalOrders } = await getSellerOrders(userId, currentPage, itemsPerPage);
    console.log('주문', orders);
    console.log('전체주문', totalOrders);
    if (!orders || orders.length === 0) {
      return (
        <div className="mt-[80px] mb-[421px] text-center overflow-hidden text-ellipsis text-font/main text-15-n-22-375 mt-[16px] text-font/main truncate">
          주문내역이 아직 없습니다
        </div>
      );
    }

    return (
      <>
        <AccordionMenu orders={orders} />
        <Pagination
          totalItems={totalOrders}
          currentPage={currentPage}
          pageCount={10}
          itemCountPerPage={itemsPerPage}
        />
      </>
    );
  } catch (error) {
    return notFound;
  }
}
