import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Header from './(root)/_components/Header';
import Footer from './(root)/_components/Footer';
import TopButton from './(root)/_components/TopButton';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      <div className="px-[190px]">{children}</div>
      <TopButton />
      <Footer />
    </QueryProvider>
  );
};

export default ProvidersLayout;
