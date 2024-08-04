import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Header from './(root)/_components/Header';
import Footer from './(root)/_components/Footer';
import TopButton from './(root)/_components/TopButton';
import Carousel from './(root)/(home)/Carousel';
import LiveCommerce from './(root)/(home)/LiveCommerce';
import Advertising from './(root)/(home)/Advertising';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      <div className="max-w-[1280px] px-[20px] mx-auto">{children}</div>
      <TopButton />
      <Footer />
    </QueryProvider>
  );
};

export default ProvidersLayout;
