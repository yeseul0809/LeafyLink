import Link from 'next/link';
import React from 'react';
import { CategoryIconType } from '../Categories';

function CategoryIcon({ category }: { category: CategoryIconType }) {
  return (
    <Link href="/">
      <img
        src={category.imgUrl}
        alt={category.alt}
        className=" h-[50%]  lg:h-[120px]  md:h-[70px]  sm:h-[46px] "
      />
      <p className="text-center mt-6">{category.alt}</p>
    </Link>
  );
}

export default CategoryIcon;
