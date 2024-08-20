import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SellerMyPageHeader from './_components/SellerMyPageHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeafyLink',
  description: 'LeafyLink'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SellerMyPageHeader />
      {children}
    </div>
  );
}
