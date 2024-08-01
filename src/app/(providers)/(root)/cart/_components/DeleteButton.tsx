// 'use client';

// import React from 'react';
// import { deleteCart } from '../actions';

// export default function DeleteButton({ productId }: { productId: string }) {
//   return (
//     <button onClick={() => deleteCart(productId)}>
//       <img src="/icons/icon-close.svg" alt="closeButton" width={20} height={20} />
//     </button>
//   );
// }

'use client';

import { useCartStore } from '@/stores';
import React from 'react';

export default function DeleteButton({ productId }: { productId: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button onClick={() => removeItem(productId)}>
      <img src="/icons/icon-close.svg" alt="closeButton" width={20} height={20} />
    </button>
  );
}
