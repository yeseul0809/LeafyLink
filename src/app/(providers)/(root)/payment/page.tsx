import Image from 'next/image';
import React from 'react';
import paymentHandler from './payment';
import supabaseSever from '@/supabase/supabaseServer';
import supabase from '@/supabase/supabaseClient';

export default async function PaymentPage() {
  const { data: userData } = await supabaseSever.auth.getUser();
  // console.log(userData);

  const { data: productData } = await supabaseSever
    .from('Product')
    .select()
    .eq('product_id', '0a1ace37-0c0b-41c7-a09b-54a19ded6c9c'); // 상세페이지에서 바로구매 버튼 클릭시 product_id,주문수량 받아와야함

  let product;
  if (productData) {
    product = productData[0];
  }

  return (
    <>
      <div>
        <h1>주문/결제</h1>
        <section>
          <h2>주문자</h2>
          <div>
            <input type="checkbox" id="same" />
            <label htmlFor="same">회원 정보와 동일</label>
            <input type="checkbox" id="new" />
            <label htmlFor="new">새로운 배송지</label>
          </div>
          <div className="flex flex-col">
            <div>
              <label htmlFor="recipient">받는 사람</label>
              <input type="text" id="recipient" placeholder="이름" />
            </div>
            <div className="flex">
              <label htmlFor="address">주소</label>
              <div className="flex flex-col">
                <input type="text" id="address" placeholder="우편번호" />
                <input type="text" id="address" placeholder="기본주소" />
                <input type="text" id="address" placeholder="나머지 상세주소" />
              </div>
            </div>
            <div>
              <label htmlFor="phone">휴대폰번호</label>
              <input type="number" id="phone" />
              <span>-</span>
              <input type="number" id="phone" />
              <span>-</span>
              <input type="number" id="phone" />
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="email">이메일</label>
              <input type="text" id="email" />
              <select name="" id="">
                <option value="">gmail.com</option>
                <option value="">naver.com</option>
                <option value="">hanmail.net</option>
              </select>
            </div>
            <div>
              <input type="checkbox" id="default" />
              <label htmlFor="default">기본 배송지로 저장</label>
            </div>
          </div>
        </section>
        <section>
          <h2>주문상품 1개</h2>
          <div>
            <div className="flex">
              <Image
                src={`${product?.thumbnail_url}`}
                alt="테스트이미지"
                width={150}
                height={150}
              />
              <div>
                <p>{product?.title}</p>
                <p>{product?.price}원</p>
              </div>
            </div>
            <div>
              <span>배송비</span>
              <span>무료</span>
            </div>
          </div>
        </section>
        <section>
          <h2>결제정보</h2>
          <div>
            <span>총 상품 금액</span>
            <span>99,999원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div>
            <span>최종 결제 금액</span>
            <span>99,999원</span>
          </div>
        </section>
        <section>
          <h2>결제수단</h2>
          <p>결제수단 선택</p>
          <div>카카오 페이</div>
        </section>
      </div>
      <button onClick={paymentHandler}>결제하기</button>
    </>
  );
}
