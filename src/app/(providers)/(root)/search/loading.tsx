import Image from 'next/image';
import React from 'react';

function loading() {
  return (
    <div className="h-screen flex justify-center items-center z-1000">
      <Image src="/loading.gif" alt="로딩이미지" width={463} height={124} />
    </div>
  );
}

export default loading;
