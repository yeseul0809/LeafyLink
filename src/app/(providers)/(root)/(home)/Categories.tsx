'use client';
import Link from 'next/link';
import { useState } from 'react';
import CategoryIcon from './_components/CategoryIcon';

export type CategoryIconType = {
  imgUrl: string;
  alt: string;
};

function Categories() {
  const [categoryIcons, setCategoryIcons] = useState<CategoryIconType[]>([
    {
      imgUrl: '/icons/icon-seed.svg',
      alt: '씨앗'
    },
    {
      imgUrl: '/icons/icon-seedling.svg',
      alt: '모종'
    },
    {
      imgUrl: '/icons/icon-kit.svg',
      alt: '재배키트'
    },
    {
      imgUrl: '/icons/icon-soil.svg',
      alt: '흙, 비료'
    },
    {
      imgUrl: '/icons/icon-goods.svg',
      alt: '원예용품'
    }
  ]);

  console.log('categoryIcons', categoryIcons);

  return (
    <div className="lg:w-[1020px] grid grid-cols-5 lg:gap-[175px] mx-auto mt-[120px] text-center justify-items-center">
      {categoryIcons.map((category) => (
        <CategoryIcon key={category.alt} category={category} />
      ))}
    </div>
  );
}

export default Categories;
