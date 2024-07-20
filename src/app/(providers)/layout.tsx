import QueryProvider from '@/providers/QueryProvider';
import { PropsWithChildren } from 'react';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ProvidersLayout;
