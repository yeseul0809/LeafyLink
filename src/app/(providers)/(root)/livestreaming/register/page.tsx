import React from 'react';
import LiveRegisterForm from '../_components/LiveRegisterForm';

function LiveRegisterPage() {
  return (
    <div className="mt-14 mb-36">
      <h1 className="mb-14 font-semibold text-2xl text-center">라이브 설정</h1>
      <section className="w-full">
        <LiveRegisterForm />
      </section>
    </div>
  );
}

export default LiveRegisterPage;
