import Image from 'next/image';
import Link from 'next/link';
import { getProductCount, getProductDatas, getTotalPages } from './actions';
import Searchform from './_components/Searchform';
import SelectBox from './_components/SelectBox';

interface Props {
  searchParams: {
    page?: string;
    keyword: string;
    sort?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const keyword = decodeURIComponent(searchParams.keyword || '');
  const currentPage = parseInt(searchParams.page || '1', 10);
  const sortParam = searchParams.sort || 'new';
  const perPage = 20;

  const allProductsData = await getProductCount(keyword);
  const searchDatas = await getProductDatas(keyword, currentPage, perPage, sortParam);
  const totalPages = await getTotalPages(keyword, perPage);

  console.log('allProductsData::', allProductsData);

  console.log('searchDatas::', searchDatas);

  return (
    <div className="pt-[80px] pb-[180px] xs:pt-[24px] xs:pb-[120px] w-full">
      <h1 className="text-[32px] font-semibold text-center xs:text-[20px]">검색 결과</h1>
      <Searchform defaultKeword={keyword} currentPage={currentPage} />
      <div className="border-t border-Line/Regular w-full mb-[48px] xs:mb-[20px]" />
      <div className="flex justify-between mb-[31px] items-center xs:mb-[12px]">
        <p className="text-[15px] text-font/sub2">
          전체 <span className="text-black font-semibold">{allProductsData}</span> 개
        </p>
        <SelectBox />
      </div>
      {searchDatas.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-[87px] gap-[16px]">
          <p className="text-[20px] font-semibold">검색결과가 없습니다.</p>
          <p className="text-[15px]">정확한 검색어인지 확인하고 다시 검색해주세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-[20px] xs:grid-cols-2 xs:gap-[7px]">
          {searchDatas.map((data) => (
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
          ))}
        </div>
      )}
      <div className="flex justify-center gap-[12px] mt-[180px] items-center xs:gap-[8px] xs:mt-[70px]">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index}
            href={`/search?keyword=${encodeURIComponent(keyword)}&page=${index + 1}`}
            className={`font-semibold ${currentPage === index + 1 ? 'text-black border border-black rounded-[100px] w-[32px] h-[32px] flex items-center justify-center' : 'text-font/sub2 border border-white rounded-[100px] w-[32px] h-[32px] flex items-center justify-center'}`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
