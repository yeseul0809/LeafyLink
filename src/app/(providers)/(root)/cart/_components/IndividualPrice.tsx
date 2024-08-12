'use client';

import React from 'react';
import { useQuantityStore } from '@/stores';

function IndividualPrice({ productId }: { productId: string }) {
  const individualPrice = useQuantityStore((state) => state.quantities);

  return (
    <p>
      {(individualPrice[productId].quantity * individualPrice[productId].price).toLocaleString()} 원
    </p>
  );
}

export default IndividualPrice;
