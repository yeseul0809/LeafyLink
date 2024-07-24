import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Header from './(root)/_components/Header';
import Footer from './(root)/_components/Footer';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      {children}
      <Footer />
    </QueryProvider>
  );
};

export default ProvidersLayout;
