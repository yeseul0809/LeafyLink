import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllProductDatas, getProductDatas, getTotalPages } from './actions';
import Link from 'next/link';
import Searchform from './_components/Searchform';

interface Props {
  searchParams: {
    page?: string;
    keyword: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const keyword = decodeURIComponent(searchParams.keyword || '');
  const currentPage = parseInt(searchParams.page || '1', 10);
  const perPage = 20;

  const allProductsData = await getAllProductDatas(keyword);
  const searchDatas = await getProductDatas(keyword, currentPage, perPage);
  const totalPages = await getTotalPages(keyword, perPage);

  if (currentPage > totalPages) {
    return notFound();
  }

  return (
    <div className="pt-[80px] pb-[180px]">
      <h1 className="text-[32px] font-semibold text-center">검색 결과</h1>
      <Searchform defaultKeword={keyword} currentPage={currentPage} />
      <div className="border-t border-Line/Regular w-full mb-[48px]" />
      <p className="text-[15px] text-font/sub2 mb-[31px]">
        전체 <span className="text-black font-semibold">{allProductsData.length}</span> 개
      </p>
      <div className="grid grid-cols-4 gap-4">
        {searchDatas.length === 0 ? (
          <p>검색 결과가 없습니다</p>
        ) : (
          searchDatas.map((data) => (
            <div key={data.product_id}>
              <Link href={`/products/${data.product_id}`}>
                <Image
                  src={data.thumbnail_url}
                  alt="상품이미지"
                  width={295}
                  height={295}
                  className="rounded-[20px]"
                />
                <p className="font-semibold mb-[12px] mt-[20px]">{data.title}</p>
                <p className="text-[18px] font-semibold">{data.price.toLocaleString()}원</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center gap-[37px] mt-[180px] items-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index}
            href={`/search?keyword=${encodeURIComponent(keyword)}&page=${index + 1}`}
            className={`font-semibold ${currentPage === index + 1 ? 'text-black border border-black rounded-[100px] w-[32px] h-[32px] flex items-center justify-center' : 'text-font/sub2'}`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
