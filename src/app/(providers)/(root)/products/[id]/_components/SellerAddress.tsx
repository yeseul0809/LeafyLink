// const getCoordinates = async (address) => {
//   const KAKAO_REST_API_URL = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

//   try {
//     const response = await fetch(KAKAO_REST_API_URL, {
//       method: 'GET',
//       headers: {
//         Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     if (data.documents.length > 0) {
//       const { x, y } = data.documents[0].address;
//       return { lat: parseFloat(y), lng: parseFloat(x) };
//     } else {
//       throw new Error('No results found');
//     }
//   } catch (error) {
//     console.error('Error fetching coordinates:', error);
//     return null;
//   }
// };

// import React, { useState } from 'react';

// const AddressToCoordinates = () => {
//   const [address, setAddress] = useState('');
//   const [coordinates, setCoordinates] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const coords = await getCoordinates(address);
//     setCoordinates(coords);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="주소를 입력하세요"
//         />
//         <button type="submit">위치 찾기</button>
//       </form>
//       {coordinates && (
//         <div>
//           <p>위도: {coordinates.lat}</p>
//           <p>경도: {coordinates.lng}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressToCoordinates;
