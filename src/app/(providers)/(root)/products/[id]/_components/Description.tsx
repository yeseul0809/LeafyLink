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
    <section className="pt-[82px] px-[270px] pb-[110px] flex flex-col text-center items-center w-full">
      <div className="ql-editor w-[700px]" dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
    </section>
  );
}

export default ProductDescription;
