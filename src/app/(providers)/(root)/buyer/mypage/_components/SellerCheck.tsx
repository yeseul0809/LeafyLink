'use client';
import { createClient } from '@/supabase/supabaseClient';
import { useState, useEffect } from 'react';

interface BusinessInfoResponse {
  b_no: string;
  start_dt: string;
  b_nm: string;
  b_adr: string;
  request_param: {
    b_no: string;
    start_dt: string;
    p_nm: string;
    b_nm: string;
    b_adr: string;
  };
}

interface SellerCheckProps {
  userData: {
    user_id: string;
    email: string;
    address_code: string;
    address: string;
    address_detail: string;
    phone: string;
    avatar_url: string;
  };
}

function SellerCheck({ userData }: SellerCheckProps) {
  const [businessNumber, setBusinessNumber] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [result, setResult] = useState<BusinessInfoResponse | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const checkInputNull = () => {
    const fullCode = businessNumber;
    const isValidLength = fullCode.length === 10;
    return isValidLength && /^[0-9]+$/.test(fullCode);
  };

  const codeCheck = async () => {
    if (!checkInputNull()) {
      alert('사업자등록번호를 올바르게 입력하세요.');
      return;
    }

    const fullCode = businessNumber;
    const data = {
      businesses: [
        {
          b_no: fullCode,
          start_dt: startDate,
          p_nm: name,
          b_nm: businessName
        }
      ]
    };

    try {
      const response = await fetch(
        `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&returnType=JSON`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.status_code === 'OK' && result.valid_cnt === 1) {
        setResult(result.data[0]);
        await createSeller(result.data[0]);
      } else {
        alert('사업자 등록 번호가 유효하지 않습니다.');
      }
    } catch (error) {
      console.error('error', error);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const createSeller = async (businessData: BusinessInfoResponse) => {
    const supabase = createClient();
    const { user_id, phone, avatar_url } = userData;

    const { data: existingSeller, error: fetchError } = await supabase
      .from('Seller')
      .select('seller_id')
      .eq('seller_id', user_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      alert('판매자 확인 중 오류가 발생했습니다: ' + fetchError.message);
      return;
    }

    if (existingSeller) {
      alert('이미 등록된 판매자입니다.');
      return;
    }

    const { error } = await supabase.from('Seller').insert({
      seller_id: user_id,
      business_number: businessData.b_no,
      business_name: businessData.request_param.b_nm,
      business_inception: businessData.request_param.start_dt,
      user_name: businessData.request_param.p_nm,
      email: userData.email,
      address_code: userData.address_code,
      address: userData.address,
      address_detail: userData.address_detail,
      phone: phone,
      avatar_url: avatar_url
    });

    if (error) {
      alert('판매자 생성 중 오류가 발생했습니다: ' + error.message);
    } else {
      alert('판매자 정보가 성공적으로 저장되었습니다.');
    }
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          codeCheck();
        }}
      >
        <table>
          <tbody>
            <tr>
              <th>사업자등록번호</th>
              <td>
                <input
                  type="text"
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  placeholder="예: 1234567890"
                />
              </td>
            </tr>
            <tr>
              <th>개업일자</th>
              <td>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="YYYYMMDD"
                />
              </td>
            </tr>
            <tr>
              <th>대표자 성명</th>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="대표자 성명"
                />
              </td>
            </tr>
            <tr>
              <th>상호명</th>
              <td>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="상호명 입력"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit">인증</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SellerCheck;
