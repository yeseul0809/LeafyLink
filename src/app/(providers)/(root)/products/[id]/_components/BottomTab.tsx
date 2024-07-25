'use client';

import { useEffect, useState } from 'react';
import TopButtons from './TopButtons';
import { TopSectionProps } from './TopSection';

function BottomTab({ product }: TopSectionProps) {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > 100 && scrollPosition + viewportHeight < documentHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg transition-transform transform ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ zIndex: 1000 }}
    >
      <strong>{product.title}</strong>
      <TopButtons productId={product.product_id} productPrice={product.price} />
    </div>
  );
}

export default BottomTab;
