'use client';

import React from 'react';
import { deleteCart } from '../actions';

export default function DeleteButton({ productId }: { productId: string }) {
  return (
    <button onClick={() => deleteCart(productId)}>
      <img src="/icons/icon-close.svg" alt="closeButton" width={28} height={28} />
    </button>
  );
}
