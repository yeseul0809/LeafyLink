'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    if (keyword === '') {
      return;
    }
    router.push(`/search?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex justify-center mt-[32px] mb-[48px] xs:mt-[16px] xs:mb-[20px] "
    >
      <div className="relative">
        <input
          type="text"
          name="keyword"
          defaultValue={defaultKeword}
          className="pr-[20px] py-[16px] pl-[46px] text-font/sub2 border border-Line/Regular rounded-[100px] w-[820px] text-[16px] max_md:w-[337px]"
        />
        <Image
          src="/icons/reading-glasses.png"
          alt="돋보기"
          width={20}
          height={20}
          className="absolute top-5 left-[20px]"
        />
      </div>
    </form>
  );
}
