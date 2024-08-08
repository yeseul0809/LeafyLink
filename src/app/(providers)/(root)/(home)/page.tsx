import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import NewProduct from './NewProduct';
import LiveCommerce from './LiveCommerce';
import Goods from './Goods';
import Recommend from './Recommend';
import BestSeller from './BestSeller';
import Advertising from './Advertising';

function Home() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s">
        <Carousel />
        <Categories />
        <NewProduct />
        <LiveCommerce category="all" />
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
