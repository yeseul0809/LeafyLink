'use client';

import supabase from '@/supabase/supabaseClient';
import AddressForm from '../../_components/AddressForm';
import PhoneForm from '../../_components/PhoneForm';
import { notFound } from 'next/navigation';

interface BuyerMyPageProps {
  params: { id: string };
}

export default async function BuyerMyPage({ params }: BuyerMyPageProps) {
  const { data, error } = await supabase.from('User').select('*').eq('user_id', params.id).single();

  if (error || !data) {
    notFound();
  }

  const initialAddress = data.address || '';
  const initialDetailAddress = data.address_detail || '';
  const initialAddressCode = data.address_code || '';
  const initialPhone = data.phone || '';
  const initialUserName = data.user_name || '사용자 이름';
  const avatarUrl = data.avatar_url || '/path/to/default-avatar.png';

  const handlePhoneUpdate = async (newPhone: string) => {
    const { error } = await supabase
      .from('User')
      .update({ phone: newPhone })
      .eq('user_id', params.id);
    if (error) {
      console.error('Error updating phone:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">구매자 마이페이지</h1>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">주소록 등록</h2>
        <AddressForm
          initialAddress={initialAddress}
          initialDetailAddress={initialDetailAddress}
          initialAddressCode={initialAddressCode}
          initialUserName={initialUserName}
          avatarUrl={avatarUrl}
          userId={params.id}
        />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">휴대폰번호</h2>
        <PhoneForm onChange={handlePhoneUpdate} initialPhone={initialPhone} />
      </div>
    </div>
  );
}
