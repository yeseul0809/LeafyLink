import Link from 'next/link';
import React from 'react';
import { CategoryIconType } from '../Categories';

function CategoryIcon({ category }: { category: CategoryIconType }) {
  return (
    <Link href="/">
      <img
        src={category.imgUrl}
        alt={category.alt}
        className="w-[120px] h-[120px] lg:h-[120px] lg:w-[120px] sm:w-[46px] sm:h-[46px]"
      />
      <p className="text-center lg:mt-6">{category.alt}</p>
    </Link>
  );
}

export default CategoryIcon;
