'use client';

import React from 'react';
import { useQuantityStore } from '@/stores';

export default function ProductPrice() {
  const quantities = useQuantityStore((state) => state.quantities);
  const totalAmount = Object.values(quantities).reduce(
    (total, { quantity, price }) => total + quantity * price,
    0
  );
  return <div>총 금액: {totalAmount.toLocaleString()} 원</div>;
}
