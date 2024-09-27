// 'use client';
// import React, { useEffect, useState } from 'react';
// import { getRelatedProducts } from '../action';

// interface SaleProductProps {
//   eventId: string;
// }

// export default function SaleProduct({ eventId }: SaleProductProps) {
//   const [products, setProducts] = useState<any[]>([]); // 제품 상태
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const [error, setError] = useState<string | null>(null); // 오류 상태

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       const data = await getRelatedProducts(eventId);
//       if (data) {
//         setProducts(data);
//       } else {
//         setError('제품을 가져오는 데 오류가 발생했습니다.');
//       }
//       setLoading(false);
//     };

//     fetchRelatedProducts();
//   }, [eventId]);

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>세일 중인 상품</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id} className="flex items-center gap-4 mb-4">
//             {product.thumbnail_url && (
//               <img
//                 src={product.thumbnail_url}
//                 alt={product.title}
//                 className="w-20 h-20 object-cover"
//               />
//             )}
//             <div>
//               <h3>{product.title}</h3>
//               <p>정가: {product.price.toLocaleString()} 원</p>
//               {product.sale_price && <p>세일가: {product.sale_price.toLocaleString()} 원</p>}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
