import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';

function Home() {
  return (
    <div className="w-full h-[1000px]">
      <Carousel />
      <Categories />
    </div>
  );
}

export default Home;
