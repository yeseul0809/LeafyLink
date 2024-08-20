import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFormState } from 'react-dom';

interface HeaderMobileProps {
  setIsOpenMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderMobileSearch({ setIsOpenMobileSearch }: HeaderMobileProps) {
  const router = useRouter();

  // 검색 로직
  const searchKeyword = (_: any, formData: FormData) => {
    const keyword = formData.get('keyword') as string;
    if (keyword === '') {
      return;
    }
    setIsOpenMobileSearch(false);
    router.push(`/search?keyword=${encodeURIComponent(keyword)}&page=${1}`);
  };
  const [state, formAction] = useFormState(searchKeyword, null);

  return (
    <section>
      <div className="w-full mx-auto absolute h-auto flex border-b border-[#E5E5EC] justify-between py-[30px] px-[20px] bg-white top-full right-0 text-center">
        <form
          action={formAction}
          className="flex justify-center mx-auto items-center max-w-[400px] w-full h-10 border rounded-full px-4"
        >
          <input
            type="text"
            className="w-full h-8"
            placeholder="어떤 식물을 찾으시나요?"
            name="keyword"
          />
          <button type="submit">
            <Image src="/icons/icon-search.svg" alt="search" width={24} height={24}></Image>
          </button>
        </form>
      </div>
    </section>
  );
}

export default HeaderMobileSearch;
