import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Footer from './(root)/_components/Footer';
import TopButton from './(root)/_components/TopButton';
import Header from './(root)/_components/(header)/Header';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <div className="w-full mx-auto">
        <Header />
        <div className="max-w-[1280px] w-full lg:px-[20px] xs:px-0 mx-auto">{children}</div>
        <TopButton />
        <Footer />
      </div>
    </QueryProvider>
  );
};

export default ProvidersLayout;
