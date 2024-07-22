import React from 'react';

export default function CartPage() {
  return (
    <div>
      <h1>장바구니</h1>
      <h2>장바구니 상품(0)</h2>
      <div className="border-t border-gray-300 mt-2" />
      <section>
        <p>장바구니가 비어 있습니다</p>
      </section>
      <div className="border-t border-gray-300 mt-2" />
      <section>
        <h2>이용안내</h2>
        <div>
          <div>
            <h3>장바구니 이용안내</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
