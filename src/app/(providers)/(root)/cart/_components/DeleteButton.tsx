'use client';

import React from 'react';
import { deleteCart } from '../actions';

export default function DeleteButton({ productId }: { productId: string }) {
  return <button onClick={() => deleteCart(productId)}>❌</button>;
}
