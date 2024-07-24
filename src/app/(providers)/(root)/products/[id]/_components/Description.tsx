'use client';

import DOMPurify from 'dompurify';

interface ProductDescriptionProps {
  productDescription: string;
}

function ProductDescription({ productDescription }: ProductDescriptionProps) {
  const sanitizedProduct = DOMPurify.sanitize(productDescription || '');

  return (
    <section className="my-8 flex flex-col items-center w-full">
      <div className="text-center border-4 mb-10 w-full">
        <h1 id="product-description-header" className="text-2xl font-bold mb-4">
          상품 상세내용
        </h1>
        <div className="flex justify-center text-center">
          <div dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;
