import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MyPageHeader from './mypage/_components/MypageHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeafyLink',
  description: 'LeafyLink'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MyPageHeader />
      {children}
    </div>
  );
}
