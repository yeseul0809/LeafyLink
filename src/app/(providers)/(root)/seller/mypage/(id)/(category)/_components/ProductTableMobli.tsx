type Product = {
  category: string;
  title: string;
  price: number | null;
  stock: number | null;
  product_id: string;
  created_at: string | null;
  description: string;
  product_seller_id: string;
  thumbnail_url: string;
  updated_at: string | null;
};

interface ProductTableMobliProps {
  product: Product;
  formatCurrency: (value: number | null) => string;
}

export default function ProductTableMobli({ product, formatCurrency }: ProductTableMobliProps) {
  return (
    <div className="h-[62px] flex-col justify-start items-start gap-4 inline-flex  w-full mt-[16px]">
      <div className="self-stretch justify-end items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch h-5 justify-start items-center gap-2 inline-flex">
            <div className="text-font/sub2 text-[13px] font-normal leading-[18px]">
              {product.category}
            </div>
            <div className="grow shrink basis-0 text-font/main text-[13px] font-semibold leading-[18px]">
              {product.title}
            </div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="justify-start items-center gap-1 flex">
              <div className="text-font/sub2 text-[13px] font-normal leading-[18px]">가격</div>
              <div className="text-font/main text-[13px] font-normal leading-[18px]">
                {formatCurrency(product.price ?? 0)}원
              </div>
            </div>
            <div className="w-px h-2.5 bg-[#e5e5ec]" />
            <div className="justify-start items-center gap-1 flex">
              <div className="text-right text-font/sub2 text-[13px] font-normal leading-[18px]">
                수량
              </div>
              <div className="text-right text-font/main text-[13px] font-normal leading-[18px]">
                {product.stock ?? 0}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right text-primary-green-500 text-sm font-semibold leading-tight">
          {product.stock === 0 ? '품절' : '판매중'}
        </div>
      </div>
      <div className="self-stretch h-[0px] border border-[#d9d9d9]"></div>
    </div>
  );
}
