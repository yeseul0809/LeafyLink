import Link from 'next/link';
import React from 'react';
import { CategoryIconType } from '../Categories';
import Image from 'next/image';

function CategoryIcon({ category }: { category: CategoryIconType }) {
  return (
    <Link href={'/'}>
      <div>
        <Image
          src={category.imgUrl}
          alt={category.alt}
          width={48}
          height={48}
          className="lg:h-[120px] lg:w-[120px] md:w-[80px] md:h-[80px] sm:w-[48px] sm:h-[48px] h-[48px] w-[48px]"
        />
        <p className="text-center lg:mt-6 lg:text-base text-xs">{category.alt}</p>
      </div>
    </Link>
  );
}

export default CategoryIcon;
