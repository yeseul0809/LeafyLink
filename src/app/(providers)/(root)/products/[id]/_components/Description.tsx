'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface ProductDescriptionProps {
  productDescription: string;
}

function ProductDescription({ productDescription }: ProductDescriptionProps) {
  const [sanitizedProduct, setSanitizedProduct] = useState<string>('');

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(productDescription || '');
    setSanitizedProduct(sanitized);
  }, [productDescription]);

  return (
    <section className="my-8 flex flex-col items-center w-full">
      <div dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
    </section>
  );
}

export default ProductDescription;
