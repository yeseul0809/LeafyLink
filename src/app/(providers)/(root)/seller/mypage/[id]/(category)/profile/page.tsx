import { createClient } from '@/supabase/supabaseServer';
import SellerEditFrom from '../_components/SellerEditFrom';

interface BuyerMyPageProps {
  params: { id: string };
}

export default async function BuyerMyPage({ params }: BuyerMyPageProps) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('Seller')
    .select('*')
    .eq('seller_id', params.id)
    .single();

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }
  console.log(data);
  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <section className="max-w-screen-sm mx-auto">
      <div className="mb-8">
        <SellerEditFrom sellerData={data} />
      </div>
    </section>
  );
}
