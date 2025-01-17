import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import NewProduct from './NewProduct';
import LiveCommerce from './LiveCommerce';
import Goods from './Goods';
import Recommend from './Recommend';
import BestSeller from './BestSeller';
import Advertising from './Advertising';
import LiveCommerceMobile from './LiveCommerceMobile';

const images = ['/carousel-1.webp', '/carousel-2.webp', '/carousel-3.webp'];
const mobileImages = [
  '/mobile-carousel-1.webp',
  '/mobile-carousel-2.webp',
  '/mobile-carousel-3.webp'
];

function Home() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
        <div className="max_xs:hidden max_sm:hidden max_md:block max_lg:block block">
          <Carousel images={images} />
        </div>
        <div className="max_xs:block max_sm:block max_md:hidden max_lg:hidden hidden">
          <Carousel images={mobileImages} />
        </div>
        <Categories />
        <NewProduct />
        <div className="max_xs:hidden max_sm:hidden max_md:block max_lg:block block">
          <LiveCommerce category="all" />
        </div>
        <div className="max_xs:block max_sm:block max_md:hidden max_lg:hidden hidden">
          <LiveCommerceMobile category="all" />
        </div>
        <Goods />
        <Recommend />
        <BestSeller />
        <div className="relative">
          <Advertising />
        </div>
      </div>
    </div>
  );
}

export default Home;
