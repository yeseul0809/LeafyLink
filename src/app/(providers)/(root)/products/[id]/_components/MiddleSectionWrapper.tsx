'use client';

import React, { useRef, useState } from 'react';

import ProductDescription from './Description';
import ActiveTab from './ActiveTab';
import ReviewEdit from './ReviewEdit';

interface MiddleSectionWrapperProps {
  productDescription: string;
  reviewProductId: string;
  reviewCount: number;
}

function MiddleSectionWrapper({
  productDescription,
  reviewProductId,
  reviewCount
}: MiddleSectionWrapperProps) {
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
        <ReviewEdit reviewProductId={reviewProductId} reviewCount={reviewCount} />
      </div>
    </>
  );
}

export default MiddleSectionWrapper;
