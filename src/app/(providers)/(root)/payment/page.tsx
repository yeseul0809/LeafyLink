import React, { Suspense } from 'react';
import PaymentPage from './_components/Payment';

export default function Payment() {
  return (
    <Suspense>
      <PaymentPage />
    </Suspense>
  );
}
