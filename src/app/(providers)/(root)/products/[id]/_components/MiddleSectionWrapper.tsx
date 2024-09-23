'use client';

import React, { useRef, useState } from 'react';

import ProductDescription from './Description';
import ActiveTab from './ActiveTab';
import ReviewEdit from './ReviewEdit';
import { Review } from '@/types/review';
import KakaoMap from './KakaoMap';

interface MiddleSectionWrapperProps {
  productDescription: string;
  reviewProductId: string;
  reviewCount: number;
  productId: string;
}

function MiddleSectionWrapper({
  productDescription,
  reviewProductId,
  reviewCount,
  productId
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
        reviewCount={reviewCount}
      />

      <ProductDescription productDescription={productDescription} />
      <KakaoMap productId={productId} />
      <div ref={reviewRef} className="text-center">
        <ReviewEdit reviewProductId={reviewProductId} reviewCount={reviewCount} />
      </div>
    </>
  );
}

export default MiddleSectionWrapper;
