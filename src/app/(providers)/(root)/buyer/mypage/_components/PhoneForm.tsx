// 'use client';

// interface PhoneFormProps {
//   onChange?: (value: string) => void;
// }

// const PhoneForm: React.FC<PhoneFormProps> = ({ onChange }) => {
//   // 입력 필드의 길이를 제한하는 함수
//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
//     const value = e.target.value.replace(/[^0-9]/g, '');
//     if (value.length > maxLength) {
//       e.target.value = value.slice(0, maxLength);
//     } else {
//       e.target.value = value;
//     }

//     // 부모 컴포넌트로 변경 사항 전달
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   };

//   return (
//     <section className="flex items-center space-x-2">
//       <input
//         type="text"
//         placeholder="010"
//         className="border p-2 rounded w-1/4 text-center"
//         maxLength={3} // HTML input의 maxLength 속성
//         onChange={(e) => handleInput(e, 3)} // ChangeEvent 사용
//       />
//       <span className="text-lg font-semibold">-</span>
//       <input
//         type="text"
//         placeholder="4444"
//         className="border p-2 rounded w-1/4 text-center"
//         maxLength={4} // HTML input의 maxLength 속성
//         onChange={(e) => handleInput(e, 4)} // ChangeEvent 사용
//       />
//       <span className="text-lg font-semibold">-</span>
//       <input
//         type="text"
//         placeholder="4444"
//         className="border p-2 rounded w-1/4 text-center"
//         maxLength={4} // HTML input의 maxLength 속성
//         onChange={(e) => handleInput(e, 4)} // ChangeEvent 사용
//       />
//     </section>
//   );
// };

// export default PhoneForm;
