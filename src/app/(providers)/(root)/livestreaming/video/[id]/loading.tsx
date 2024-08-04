import Image from 'next/image';
import React from 'react';

function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center z-1000">
      <Image src="/loading.gif" alt="로딩이미지" width={463} height={124} className="" />
    </div>
  );
}

export default loading;
