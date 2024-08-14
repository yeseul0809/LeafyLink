import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Footer from './(root)/_components/Footer';
import TopButton from './(root)/_components/TopButton';
import Header from './(root)/_components/(header)/Header';
import Weather from './(root)/_components/(header)/Weather';
import FooterMobile from './(root)/_components/FooterMobile';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <div className="w-full mx-auto">
        {/* <Weather /> */}
        <Header />
        <div className="max-w-[1280px] w-full lg:px-[20px] :px-0 mx-auto">{children}</div>
        {/* <TopButton /> */}
        <div className="max_xs:hidden max_sm:block max_md:block max_lg:block mx-auto">
          {/* <Footer /> */}
        </div>
        <div className=" block xs_:hidden">{/* <FooterMobile /> */}</div>
      </div>
    </QueryProvider>
  );
};

export default ProvidersLayout;
