// //진위 확인용
// // 'use client';
// // import { useState, useEffect } from 'react';

// // // API 응답의 구조를 정의합니다.
// // interface BusinessInfoResponse {
// //   b_no: string; // 사업자 등록 번호
// //   tax_type: string; // 세금 유형
// //   start_dt: string; // 사업자 상태
// //   // 필요한 다른 속성도 추가할 수 있습니다.
// // }

// // const BusinessCheck = () => {
// //   const [code1, setCode1] = useState('');
// //   const [code2, setCode2] = useState('');
// //   const [code3, setCode3] = useState('');
// //   const [result, setResult] = useState<BusinessInfoResponse | null>(null);
// //   const [hydrated, setHydrated] = useState(false);

// //   useEffect(() => {
// //     setHydrated(true);
// //   }, []);

// //   const checkInputNull = () => {
// //     const fullCode = `${code1}${code2}${code3}`;
// //     const isValidLength = fullCode.length === 10;
// //     return isValidLength && /^[0-9]+$/.test(fullCode);
// //   };

// //   const codeCheck = async () => {
// //     if (!checkInputNull()) {
// //       alert('사업자등록번호를 올바르게 입력하세요.');
// //       return;
// //     }

// //     const fullCode = `${code1}${code2}${code3}`;
// //     const data = {
// //       b_no: [fullCode]
// //     };

// //     try {
// //       const response = await fetch(
// //         `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Accept: 'application/json'
// //           },
// //           body: JSON.stringify(data)
// //         }
// //       );

// //       const result = await response.json();
// //       console.log(result);

// //       if (result.match_cnt === 1) {
// //         setResult(result.data[0]);
// //       } else {
// //         alert('사업자 등록 번호가 유효하지 않습니다.');
// //       }
// //     } catch (error) {
// //       console.error('error', error);
// //       alert('오류가 발생했습니다. 다시 시도해 주세요.');
// //     }
// //   };

// //   if (!hydrated) {
// //     return null;
// //   }

// //   return (
// //     <div>
// //       <form
// //         onSubmit={(e) => {
// //           e.preventDefault();
// //           codeCheck();
// //         }}
// //       >
// //         <table className="tb_board_1">
// //           <tbody>
// //             <tr>
// //               <th scope="row">사업자등록번호</th>
// //               <td className="left_5">
// //                 <div>
// //                   <input
// //                     type="text"
// //                     name="code1"
// //                     value={code1}
// //                     onChange={(e) => setCode1(e.target.value)}
// //                     maxLength="3"
// //                     placeholder="123"
// //                     style={{ imeMode: 'disabled' }}
// //                   />
// //                   -
// //                   <input
// //                     type="text"
// //                     name="code2"
// //                     value={code2}
// //                     onChange={(e) => setCode2(e.target.value)}
// //                     maxLength="2"
// //                     placeholder="45"
// //                     style={{ imeMode: 'disabled' }}
// //                   />
// //                   -
// //                   <input
// //                     type="text"
// //                     name="code3"
// //                     value={code3}
// //                     onChange={(e) => setCode3(e.target.value)}
// //                     maxLength="5"
// //                     placeholder="67890"
// //                     style={{ imeMode: 'disabled' }}
// //                   />
// //                 </div>
// //                 <button type="submit">조회</button>
// //               </td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </form>
// //       {result && (
// //         <div>
// //           <h3>사업자 정보</h3>
// //           <p>사업자 등록 번호: {result.b_no}</p>
// //           <p>세금 유형: {result.tax_type}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BusinessCheck;
// 'use client';
// import { useState, useEffect } from 'react';

// // API 응답의 구조를 정의합니다.
// interface RequestParam {
//   b_no: string[];
//   start_dt: string;
//   p_nm: string;
//   b_nm: string;
//   corp_no: string;
//   b_sector: string;
//   b_type: string;
//   b_adr: string;
// }

// interface BusinessInfoResponse {
//   b_no: string;
//   valid: string;
//   valid_msg: string;
//   request_param: RequestParam;
// }

// const BusinessCheck = () => {
//   const [code1, setCode1] = useState('');
//   const [code2, setCode2] = useState('');
//   const [code3, setCode3] = useState('');
//   const [result, setResult] = useState<BusinessInfoResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   const checkInputNull = () => {
//     const fullCode = `${code1}${code2}${code3}`;
//     const isValidLength = fullCode.length === 10;
//     const isNumeric = /^[0-9]+$/.test(fullCode);
//     return isValidLength && isNumeric;
//   };

//   const codeCheck = async () => {
//     if (!checkInputNull()) {
//       alert('사업자등록번호를 올바르게 입력하세요.');
//       return;
//     }

//     const fullCode = `${code1}${code2}${code3}`;
//     const data = {
//       b_no: [fullCode]
//     };

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//           },
//           body: JSON.stringify(data)
//         }
//       );

//       if (!response.ok) {
//         throw new Error('서버 응답 오류');
//       }

//       const result = await response.json();
//       console.log('API 응답:', result); // API 응답 확인

//       // 응답 데이터가 존재하는지 확인합니다.
//       if (
//         result.match_cnt === 1 &&
//         result.data &&
//         Array.isArray(result.data) &&
//         result.data.length > 0
//       ) {
//         const businessData = result.data[0];
//         const businessInfo: BusinessInfoResponse = {
//           b_no: businessData.b_no || '',
//           valid: businessData.valid || '',
//           valid_msg: businessData.valid_msg || '',
//           request_param: {
//             b_no: businessData.b_no ? [businessData.b_no] : [],
//             start_dt: businessData.start_dt || '',
//             p_nm: businessData.p_nm || '',
//             b_nm: businessData.b_nm || '',
//             corp_no: businessData.corp_no || '',
//             b_sector: businessData.b_sector || '',
//             b_type: businessData.b_type || '',
//             b_adr: businessData.b_adr || ''
//           }
//         };

//         setResult(businessInfo);
//         console.log('비즈니스 정보:', businessInfo);
//       } else {
//         alert('사업자 등록 번호가 유효하지 않거나 데이터를 찾을 수 없습니다.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('오류가 발생했습니다. 다시 시도해 주세요.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!hydrated) {
//     return null;
//   }

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           codeCheck();
//         }}
//       >
//         <table className="tb_board_1">
//           <tbody>
//             <tr>
//               <th scope="row">사업자등록번호</th>
//               <td className="left_5">
//                 <div>
//                   <input
//                     type="text"
//                     name="code1"
//                     value={code1}
//                     onChange={(e) => setCode1(e.target.value)}
//                     maxLength="3"
//                     placeholder="123"
//                     style={{ imeMode: 'disabled' }}
//                   />
//                   -
//                   <input
//                     type="text"
//                     name="code2"
//                     value={code2}
//                     onChange={(e) => setCode2(e.target.value)}
//                     maxLength="2"
//                     placeholder="45"
//                     style={{ imeMode: 'disabled' }}
//                   />
//                   -
//                   <input
//                     type="text"
//                     name="code3"
//                     value={code3}
//                     onChange={(e) => setCode3(e.target.value)}
//                     maxLength="5"
//                     placeholder="67890"
//                     style={{ imeMode: 'disabled' }}
//                   />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                   조회
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//       {loading && <p>로딩 중...</p>}
//       {result && (
//         <div>
//           <h3>사업자 정보</h3>
//           <p>사업자 등록 번호: {result.b_no}</p>
//           <p>유효성: {result.valid}</p>
//           <p>유효성 메시지: {result.valid_msg}</p>
//           <h4>요청 파라미터</h4>
//           <p>사업자 등록 번호: {result.request_param.b_no}</p>
//           <p>시작일: {result.request_param.start_dt}</p>
//           <p>대표자명: {result.request_param.p_nm}</p>
//           <p>상호명: {result.request_param.b_nm}</p>
//           <p>법인번호: {result.request_param.corp_no}</p>
//           <p>업종: {result.request_param.b_sector}</p>
//           <p>사업유형: {result.request_param.b_type}</p>
//           <p>사업장 주소: {result.request_param.b_adr}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BusinessCheck;
