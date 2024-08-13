import ProductForm from './_components/ProductForm';

async function ProductEditPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[1240px] w-full">
      <h1 className="text-[26px] md:text-[32px] font-semibold pt-[80px] pb-[24px] text-center">
        상품 수정
      </h1>
      <div className="lg:max-w-[1240px] md:max-w-[744px]">
        <ProductForm />
      </div>
    </div>
  );
}

export default ProductEditPage;
