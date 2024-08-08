//

export const getAllProduct = async () => {
  console.log('진입1');
  const imsi = 'http://localhost:3000';
  const response = await fetch(`${imsi}/api/products`);
  // const result = await response.json();
  // console.log('result', result);
  if (!response.ok) {
    throw new Error('상품 목록을 가져오는데 실패했습니다.');
  }
  return response;
};
