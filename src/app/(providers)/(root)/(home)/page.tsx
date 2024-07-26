import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import NewProduct from './NewProduct';
import LiveCommerce from './LiveCommerce';

function Home() {
  return (
    <div className="w-full">
      <Carousel />
      <Categories />
      <NewProduct />
      <LiveCommerce />
    </div>
  );
}

export default Home;
