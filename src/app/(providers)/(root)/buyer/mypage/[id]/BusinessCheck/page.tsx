import SellerCheck from '../../_components/SellerCheck';
import { createClient } from '@/supabase/supabaseServer';

interface BuyerMyPageProps {
  params: { id: string };
}

export default async function BusinessCheck({ params }: BuyerMyPageProps) {
  const supabase = createClient();
  const { data, error } = await supabase.from('User').select('*').eq('user_id', params.id).single();

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <section className="max-w-screen-sm mx-auto">
      <div className="mb-8">
        <SellerCheck userData={data} />
      </div>
    </section>
  );
}
