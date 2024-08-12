'use client';

import { useQuantityStore } from '@/stores';
import React from 'react';

function IndividualPrice({ productId }: { productId: string }) {
  const individualPrice = useQuantityStore((state) => state.quantities);

  return (
    <p>
      {(individualPrice[productId].quantity * individualPrice[productId].price).toLocaleString()} 원
    </p>
  );
}

export default IndividualPrice;
