import Link from 'next/link';
import { ProductTableProps } from './ProductTable';

export default function EventTable({ sellerId }: ProductTableProps) {
  return (
    <div className="flex justify-end mt-[28px] gap-5">
      <button className="px-[12px] py-[9px] rounded text-[13px] font-normal leading-[18px] tracking-[-0.325px] bg-grayscale-gray-50 text-grayscale-gray-500">
        이벤트 삭제
      </button>
      <Link
        href={`/seller/mypage/${sellerId}/eventregister`}
        className="px-[12px] py-[9px] bg-primary-green-500 rounded text-white text-[13px] font-normal leading-[18px] tracking-[-0.325px] transition-colors duration-300 hover:bg-primary-green-700 hover:text-white"
      >
        이벤트 등록
      </Link>
    </div>
  );
}
