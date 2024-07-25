import React from 'react';
import LiveRegisterForm from '../_components/LiveRegisterForm';

function LiveRegisterPage() {
  return (
    <div>
      <h1>쇼핑 라이브 등록</h1>
      <section className="w-full ">
        <LiveRegisterForm />
      </section>
    </div>
  );
}

export default LiveRegisterPage;
