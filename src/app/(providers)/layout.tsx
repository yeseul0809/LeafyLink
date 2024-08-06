import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Header from './(root)/_components/(header)/Header';
import Footer from './(root)/_components/Footer';
import TopButton from './(root)/_components/TopButton';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      <div className="max-w-[1280px] w-full px-[20px] mx-auto">{children}</div>
      <TopButton />
      <Footer />
    </QueryProvider>
  );
};

export default ProvidersLayout;
