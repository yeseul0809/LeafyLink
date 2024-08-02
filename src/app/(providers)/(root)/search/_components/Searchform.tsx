'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Searchform({
  defaultKeword,
  currentPage
}: {
  defaultKeword: string;
  currentPage: number;
}) {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get('keyword') as string;
    router.push(`/search?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex justify-center mt-[32px] mb-[48px] xs:mt-[16px] xs:mb-[20px]"
    >
      <input
        type="text"
        name="keyword"
        defaultValue={defaultKeword}
        className="pr-[20px] py-[16px] pl-[46px] text-font/sub2 border border-Line/Regular rounded-[100px] w-[820px] text-[16px]"
      />
      <Image
        src="/icons/reading-glasses.png"
        alt="돋보기"
        width={20}
        height={20}
        className="absolute top-5 left-[5%]"
      />
      {/* <button type="submit" className="absolute top-5 left-[230px] xs:left-[15px]">
      </button> */}
    </form>
  );
}
