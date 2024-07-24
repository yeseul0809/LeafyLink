'use client';

import React, { useRef, useState } from 'react';

import ProductDescription from './Description';
import ProductReview from './Review';
import ActiveTab from './ActiveTab';

interface ActiveTabWrapperProps {
  productDescription: string;
  reviewProductId: string;
}

function ActiveTabWrapper({ productDescription, reviewProductId }: ActiveTabWrapperProps) {
  const [activeTab, setActiveTab] = useState('description');
  const reviewRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ActiveTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleScrollToReview={handleScrollToReview}
      />
      <ProductDescription productDescription={productDescription} />
      <div ref={reviewRef} className="text-center">
        <ProductReview reviewProductId={reviewProductId} />
      </div>
    </>
  );
}

export default ActiveTabWrapper;
