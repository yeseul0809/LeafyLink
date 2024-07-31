import { createClient } from '@/supabase/supabaseServer';
import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import ProductTable from '../_components/ProductTable';

interface ProductPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { id } = params;
  const supabase = createClient();

  // 페이지네이션을 위한 현재 페이지와 아이템 수 설정
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const currentPage = page || 1;
  const itemsPerPage = 1;

  // 총 제품 수 조회
  const { count: totalProducts, error: countError } = await supabase
    .from('Product')
    .select('*', { count: 'exact' })
    .eq('product_seller_id', id);

  if (countError) {
    return <div>총 제품 수 조회 에러: {countError.message}</div>;
  }
  console.log('상품수:', totalProducts);

  // 현재 페이지의 제품 데이터 조회
  const { data, error } = await supabase
    .from('Product')
    .select(
      'category, title, price, stock, product_id, created_at, description, product_seller_id, thumbnail_url, updated_at'
    )
    .eq('product_seller_id', id)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>제품이 없습니다.</div>;
  }

  console.log(data);

  return (
    <>
      <ProductTable sellerId={id} products={data} />
      <Pagination
        totalItems={totalProducts || 0} // 전체 제품의 총 개수
        currentPage={currentPage} // 현재 페이지 번호
        pageCount={10} // 페이지 버튼의 최대 개수
        itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
      />
    </>
  );
}
