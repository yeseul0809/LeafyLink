import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import NewProduct from './NewProduct';
import LiveCommerce from './LiveCommerce';
import Goods from './Goods';
import Recommend from './Recommend';
import BestSeller from './BestSeller';
import Advertising from './Advertising';

// 1. 서버컴포넌트로 살릴 수 있는 컴포넌트는 살린다.

function Home() {
  return (
    <div className="w-full">
      <Carousel />
      <Categories />
      <NewProduct />
      <LiveCommerce />
      <Goods />
      <Recommend />
      <BestSeller />
      <Advertising />
    </div>
  );
}

export default Home;
