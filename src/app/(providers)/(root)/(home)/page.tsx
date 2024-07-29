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
