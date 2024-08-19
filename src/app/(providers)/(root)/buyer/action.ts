'use server';
import { createClient } from '@/supabase/supabaseServer';

export const getUserId = async (userId: string) => {
  const supabase = createClient();
  const { data: User, error } = await supabase
    .from('User')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return User;
};

export const updateUserData = async (
  userId: string,
  updatedData: {
    address: string;
    detailAddress: string;
    addressCode: string;
    userName: string;
    phone: string;
  }
) => {
  const supabase = createClient();
  const { error } = await supabase.from('User').update(updatedData).eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
};

//숫자 단위표시
export const formatCurrency = (value: number) => {
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

//날짜YYYYMMDD
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const buyerOrders = async (userId: string, currentPage: number, itemsPerPage: number) => {
  const supabase = createClient();

  // 총 주문 수를 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_user_id', userId);

  if (countError) {
    throw new Error(`총 주문 수 조회 에러: ${countError.message}`);
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
    throw new Error(`데이터 조회 에러: ${orderError?.message || productError?.message}`);
  }

  // 주문과 제품 데이터를 결합
  const ordersWithProducts = orders?.map((order) => {
    const product = products?.find((p) => p.product_id === order.order_product_id);
    return {
      ...order,
      Product: product || null
    };
  });

  return { ordersWithProducts, totalOrders };
};

export interface BusinessInfoResponse {
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

export const validateBusinessNumber = async (
  businessNumber: string,
  startDate: string,
  name: string,
  businessName: string
): Promise<BusinessInfoResponse | null> => {
  const data = {
    businesses: [
      {
        b_no: businessNumber,
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

    if (result.status_code === 'OK' && result.valid_cnt === 1) {
      return result.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error validating business number:', error);
    throw new Error('사업자 등록 번호 확인 중 오류가 발생했습니다.');
  }
};

export const createSeller = async (userData: any, businessData: BusinessInfoResponse) => {
  const supabase = createClient();
  const { user_id, phone, avatar_url } = userData;

  const { data: existingSeller, error: fetchError } = await supabase
    .from('Seller')
    .select('seller_id')
    .eq('seller_id', user_id)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error('판매자 확인 중 오류가 발생했습니다: ' + fetchError.message);
  }

  if (existingSeller) {
    throw new Error('이미 등록된 판매자입니다.');
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
    throw new Error('판매자 생성 중 오류가 발생했습니다: ' + error.message);
  }

  return true;
};
