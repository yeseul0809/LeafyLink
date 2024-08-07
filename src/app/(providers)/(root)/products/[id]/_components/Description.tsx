'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

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
    <section className="md:pt-[82px] md:px-[270px] md:pb-[110px] flex flex-col text-center items-center md:w-full">
      <div
        className="ql-editor w-[335px] md:w-[700px]"
        dangerouslySetInnerHTML={{ __html: sanitizedProduct }}
      />
    </section>
  );
}

export default ProductDescription;
