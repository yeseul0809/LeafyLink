// 'use client';

// import React from 'react';
// import { deleteSelectCart } from '../actions';

// export default function SelectDeleteButton(userId: { userId: string | undefined }) {
//   return <button onClick={() => deleteSelectCart(userId.userId!)}>선택 상품 삭제</button>;
// }

'use client';

import React from 'react';
import { useCartStore } from '@/stores';

export default function SelectDeleteButton({ userId }: { userId: string }) {
  const { removeSelectedItems } = useCartStore((state) => ({
    removeSelectedItems: state.removeSelectedItems
  }));

  const handleDelete = () => {
    removeSelectedItems(userId);
  };

  return <button onClick={handleDelete}>선택 상품 삭제</button>;
}
