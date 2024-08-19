import Link from 'next/link';
import React from 'react';
import { CategoryIconType } from '../Categories';

function CategoryIcon({ category }: { category: CategoryIconType }) {
  return (
    <Link href={'/'}>
      <img
        src={category.imgUrl}
        alt={category.alt}
        className="lg:h-[120px] lg:w-[120px] md:w-[80px] md:h-[80px] sm:w-[48px] sm:h-[48px] h-[48px] w-[48px]"
      />
      <p className="text-center lg:mt-6 lg:text-base text-xs">{category.alt}</p>
    </Link>
  );
}

export default CategoryIcon;
