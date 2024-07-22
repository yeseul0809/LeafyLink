import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeafyLink',
  description: 'LeafyLink'
};

function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
