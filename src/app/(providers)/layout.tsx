import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';
import Header from './(root)/_components/Header';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Header />
      {children}
    </QueryProvider>
  );
};

export default ProvidersLayout;
