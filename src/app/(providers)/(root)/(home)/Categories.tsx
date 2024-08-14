'use client';
import Link from 'next/link';
import { useState } from 'react';
import CategoryIcon from './_components/CategoryIcon';
import { useRouter } from 'next/navigation';

export type CategoryIconType = {
  imgUrl: string;
  alt: string;
  url: string;
};

function Categories() {
  const [categoryIcons, setCategoryIcons] = useState<CategoryIconType[]>([
    {
      imgUrl: '/icons/icon-seed.svg',
      alt: '씨앗',
      url: '/productsList/씨앗'
    },
    {
      imgUrl: '/icons/icon-seedling.svg',
      alt: '모종',
      url: '/productsList/모종'
    },
    {
      imgUrl: '/icons/icon-kit.svg',
      alt: '재배키트',
      url: '/productsList/재배키트'
    },
    {
      imgUrl: '/icons/icon-soil.svg',
      alt: '흙, 비료',
      url: '/productsList/흙, 비료'
    },
    {
      imgUrl: '/icons/icon-goods.svg',
      alt: '원예용품',
      url: '/productsList/원예용품'
    }
  ]);

  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div className="lg:w-[1020px] md:w-[600px] sm:w-[351px] w-[351px] mx-auto lg:mt-[120px] mt-[40px] flex justify-between items-center text-center justify-items-center">
      {categoryIcons.map((category) => (
        <button
          onClick={() => {
            redirect(`${category.url}`);
          }}
          key={category.alt}
        >
          <CategoryIcon category={category} />
        </button>
      ))}
    </div>
  );
}

export default Categories;
