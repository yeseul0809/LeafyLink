'use client';

import { useState, useEffect } from 'react';
import supabase from '@/supabase/supabaseClient';
import AddressForm from '../../_components/UserEditFrom';

interface BuyerMyPageProps {
  params: { id: string };
}

export default function BuyerMyPage({ params }: BuyerMyPageProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('user_id', params.id)
        .single();
      if (error) {
        setError(error);
      } else {
        setData(data || {});
      }
    };
    fetchData();
  }, [params.id]);

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const initialAddress = data?.address || '';
  const initialDetailAddress = data?.address_detail || '';
  const initialAddressCode = data?.address_code || '';
  const initialPhone = data?.phone || '';
  const initialUserName = data?.user_name || '사용자 이름';
  const avatarUrl = data?.avatar_url || '/path/to/default-avatar.png';

  return (
    <>
      {/* 회원 정보 변경 전체 */}
      <section className=" max-w-screen-sm mx-auto  ">
        {/* 이름 주소 프로필 폼 */}
        <div className=" mb-8">
          <AddressForm
            initialAddress={initialAddress}
            initialDetailAddress={initialDetailAddress}
            initialAddressCode={initialAddressCode}
            initialUserName={initialUserName}
            initialPhone={initialPhone}
            avatarUrl={avatarUrl}
            userId={params.id}
          />
        </div>
      </section>
    </>
  );
}